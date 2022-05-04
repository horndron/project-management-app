import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription, switchMap } from 'rxjs';
import { LoginRequestModel } from '../../models/user.model';
import { AuthHttpService } from '../../services/auth-http.service';
import { PasswordValidator } from '../../validators/password.validator';

@Component({
  selector: 'rsm-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})

export class SignUpComponent implements OnDestroy {
  public authForm: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, PasswordValidator.check]],
  });

  public errorMessage = '';

  public hasError = false;

  private signUpSub = new Subscription();

  constructor(
    private readonly router: Router,
    private readonly fb: FormBuilder,
    private readonly authService: AuthHttpService,
  ) {}

  ngOnDestroy(): void {
    if (this.signUpSub) {
      this.signUpSub.unsubscribe();
    }
  }

  get name() {
    return this.authForm.get('name');
  }

  public onSignUp() {
    const user: LoginRequestModel = {
      name: this.authForm.value.name,
      login: this.authForm.value.email,
      password: this.authForm.value.password,
    };

    this.signUpSub = this.authService.createUser(user).pipe(
      switchMap(() => this.authService.signIn({
        login: user.login,
        password: user.password,
      })),
    ).subscribe({
      next: () => this.router.navigateByUrl('/'),
      error: (error: HttpErrorResponse) => {
        this.hasError = true;
        this.errorMessage = error.error.message;
      },
    });
  }
}
