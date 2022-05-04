import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoginRequestModel } from '../../models/user.model';
import { AuthHttpService } from '../../services/auth-http.service';
import { PasswordValidator } from '../../validators/password.validator';

@Component({
  selector: 'rsm-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnDestroy {
  public authForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, PasswordValidator.check]],
  });

  public errorMessage = '';

  public hasError = false;

  private loginSub = new Subscription();

  constructor(
    private readonly router: Router,
    private readonly fb: FormBuilder,
    private readonly authService: AuthHttpService,
  ) {}

  ngOnDestroy(): void {
    if (this.loginSub) {
      this.loginSub.unsubscribe();
    }
  }

  public onSignIn() {
    const user: LoginRequestModel = {
      login: this.authForm.value.email,
      password: this.authForm.value.password,
    };
    this.loginSub = this.authService.signIn(user).subscribe({
      next: () => this.router.navigateByUrl('/'),
      error: (error: HttpErrorResponse) => {
        this.hasError = true;
        this.errorMessage = error.error.message;
      },
    });
  }
}
