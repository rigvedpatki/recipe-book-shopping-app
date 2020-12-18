import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { LocalStorageService } from '../shared/local-storage.service';
import { IAuthLoginResponse, IAuthSignupResponse } from './auth.model';
import { User } from './user.model';

@Injectable()
export class AuthService {

  private API_KEY: string;
  private BASE_URL: string;
  userSubject: BehaviorSubject<User>;
  private tokenExpirationTimer: number;

  constructor(private http: HttpClient, private localStorageService: LocalStorageService) {
    this.BASE_URL = 'https://identitytoolkit.googleapis.com/v1/accounts';
    this.API_KEY = 'AIzaSyC6AMIetwK2peJd-RArdyHldELKQakvVqM';
    this.userSubject = new BehaviorSubject(null);
  }

  signup(email: string, password: string): Observable<IAuthSignupResponse> | Observable<any> {
    return this.http
      .post<IAuthSignupResponse>(`${this.BASE_URL}:signUp`,
        { email, password, returnSecureToken: true },
        { params: new HttpParams().set('key', this.API_KEY) }
      )
      .pipe(
        catchError(this.handleError),
        tap(
          (responseData: IAuthSignupResponse) => {
            this.handleAuthentication(responseData);
          }
        )
      );
  }

  login(email: string, password: string): Observable<IAuthLoginResponse> | Observable<any> {
    return this.http
      .post<IAuthLoginResponse>(`${this.BASE_URL}:signInWithPassword`,
        { email, password, returnSecureToken: true },
        { params: new HttpParams().set('key', this.API_KEY) }
      )
      .pipe(
        catchError(this.handleError),
        tap(
          (responseData: IAuthLoginResponse) => {
            this.handleAuthentication(responseData);
          }
        )
      );
  }

  private handleError(errorResponse: HttpErrorResponse): Observable<string> {
    console.log('AuthService -> errorResponse', errorResponse);
    let errorMessage = '';
    switch (errorResponse.error?.error?.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'The email address is already in use by another account.';
        break;
      case 'OPERATION_NOT_ALLOWED':
        errorMessage = 'Password sign-in is disabled for this project.';
        break;
      case 'TOO_MANY_ATTEMPTS_TRY_LATER':
        errorMessage = 'We have blocked all requests from this device due to unusual activity. Try again later.';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'There is no user record corresponding to this identifier. The user may have been deleted.';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'The password is invalid or the user does not have a password.';
        break;
      case 'USER_DISABLED':
        errorMessage = 'The user account has been disabled by an administrator.';
        break;
      default:
        errorMessage = 'An unkown error occurred.';
        break;
    }
    return throwError(errorMessage);
  }

  private handleAuthentication(userData: IAuthSignupResponse | IAuthLoginResponse): void {
    const { email, localId, idToken, expiresIn } = userData;
    const expirationDate = new Date(new Date().getTime() + parseInt(expiresIn, 10) * 1000);
    const user = new User(email, localId, idToken, expirationDate);
    this.localStorageService.setUserData(user);
    this.autoLogout(parseInt(expiresIn, 10) * 1000);
    this.userSubject.next(user);
  }

  logout(): void {
    this.userSubject.next(null);
    this.localStorageService.removeUser();
    if (this.tokenExpirationTimer) {
      window.clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogin(): void {
    const user = this.localStorageService.getUserData();
    if (user && user.token) {
      const expirationDuration = user.tokenExpirationTime.getTime() - new Date().getTime();
      this.autoLogout(expirationDuration);
      this.userSubject.next(user);
    }
  }

  autoLogout(expirationDuration: number): void {
    this.tokenExpirationTimer = window.setTimeout(
      () => this.logout(),
      expirationDuration
    );
  }
}


