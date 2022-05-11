import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { LoginRequestModel } from '../../models/user.models';
import { PasswordValidator } from '../../validators/password.validator';
import * as UserActions from '../../store/user.actions';

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

  constructor(
    private readonly fb: FormBuilder,
    private readonly store: Store,
  ) {}

  public onSignIn(): void {
    const user: LoginRequestModel = {
      login: this.authForm.value.email,
      password: this.authForm.value.password,
    };

    this.store.dispatch(UserActions.LoginUser({ user }));
  }
}
