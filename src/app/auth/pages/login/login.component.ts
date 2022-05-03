import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginRequestModel } from '../../models/user.model';
import { AuthHttpService } from '../../services/auth-http.service';
import { PasswordValidator } from '../../validators/password.validator';

@Component({
  selector: 'rsm-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  public authForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, PasswordValidator.check]],
  });

  public errorMessage = '';

  public hasError = false;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthHttpService,
  ) {}

  public onSignIn() {
    const user: LoginRequestModel = {
      login: this.authForm.value.email,
      password: this.authForm.value.password,
    };
    this.authService.signIn(user).subscribe({
      next: () => this.router.navigateByUrl('/'),
      error: (error: HttpErrorResponse) => {
        this.hasError = true;
        this.errorMessage = error.statusText;
      },
    });
  }
}
