import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpParams
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { exhaustMap, take } from 'rxjs/operators';
import { User } from './user.model';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.authService.userSubject
      .pipe(
        take(1),
        exhaustMap(
          (user: User) => {
            if (user) {
              const modifiedRequest = request.clone({ params: new HttpParams().set('auth', user.token) });
              return next.handle(modifiedRequest);
            } else {
              return next.handle(request);
            }
          }
        ),
      );
  }
}
