import { Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { IAuthLoginResponse, IAuthSignupResponse } from './auth.model';
import { AuthService } from './auth.service';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/directives/placeholder.directive';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {

  isLoginMode: boolean;
  isLoading: boolean;
  error: string;
  authFormGroup: FormGroup;

  @ViewChild(PlaceholderDirective) alerHost: PlaceholderDirective;

  private alerComponentSub: Subscription;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver
  ) { }

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
      const { email, password } = this.authFormGroup.value;
      let authObservable: Observable<IAuthLoginResponse | IAuthSignupResponse>;
      if (this.isLoginMode) {
        authObservable = this.authService.login(email, password);
      } else {
        authObservable = this.authService.signup(email, password);
      }
      authObservable.subscribe(
        (response: IAuthLoginResponse | IAuthSignupResponse) => {
          // console.log('AuthComponent -> onAuthSubmit -> response', response);
          this.isLoading = false;
          this.router.navigate(['/recipes']);
        },
        (errorMessage: string) => {
          this.error = errorMessage;
          this.showErrorAlert(errorMessage);
          this.isLoading = false;
        }
      );
      this.authFormGroup.reset();
    }
  }

  private showErrorAlert(message: string): void {
    //! This won't work
    // const alertComponent = new AlertComponent();
    const alertComponentFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
    const hostViewContainerRef = this.alerHost.viewContainerRef;
    hostViewContainerRef.clear();
    const alertComponentRef = hostViewContainerRef.createComponent(alertComponentFactory);
    alertComponentRef.instance.message = message;
    this.alerComponentSub = alertComponentRef.instance
      .closeClicked
      .subscribe(
        () => {
          this.alerComponentSub.unsubscribe();
          hostViewContainerRef.clear();
        }
      );

  }

  onAlertClose(): void {
    this.error = null;
  }

  ngOnDestroy(): void {
    if (this.alerComponentSub) {
      this.alerComponentSub.unsubscribe();
    }
  }

}
