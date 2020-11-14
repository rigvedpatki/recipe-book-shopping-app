import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IAuthLoginResponse, IAuthSignupResponse } from './auth.model';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  isLoginMode: boolean;
  isLoading: boolean;
  error: string;
  authFormGroup: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.isLoginMode = true;
    this.isLoading = false;
    this.error = null;
    this.authFormGroup = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSwitchMode(): void {
    this.isLoginMode = !this.isLoginMode;
  }

  onAuthSubmit(): void {
    console.log(this.authFormGroup);
    if (this.authFormGroup.valid) {
      this.isLoading = true;
      const { email, password } = this.authFormGroup.value
      let authObservable: Observable<IAuthLoginResponse | IAuthSignupResponse>;
      if (this.isLoginMode) {
        authObservable = this.authService.login(email, password)
      } else {
        authObservable = this.authService.signup(email, password)
      }
      authObservable.subscribe(
        (response: IAuthLoginResponse | IAuthSignupResponse) => {
          // console.log('AuthComponent -> onAuthSubmit -> response', response);
          this.isLoading = false;
          this.router.navigate(['/recipes']);
        },
        (errorMessage: string) => {
          this.error = errorMessage;
          this.isLoading = false;
        }
      );
      this.authFormGroup.reset();
    }
  }

  onAlertClose() {
    this.error = null;
  }

}
