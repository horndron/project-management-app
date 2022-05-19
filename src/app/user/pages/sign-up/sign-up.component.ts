import { Component } from '@angular/core';
import {
  FormBuilder, FormGroup, Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { LoginRequestModel } from '../../../models/user';
import { PasswordValidator } from '../../validators/password.validator';
import * as UserActions from '../../store/user.actions';

@Component({
  selector: 'rsm-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})

export class SignUpComponent {
  public authForm: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, PasswordValidator.check]],
  });

  constructor(
    private readonly fb: FormBuilder,
    private readonly store: Store,
  ) {}

  public onSignUp(): void {
    const user: LoginRequestModel = {
      name: this.authForm.value.name,
      login: this.authForm.value.email,
      password: this.authForm.value.password,
    };

    this.store.dispatch(UserActions.RegisterUser({ user }));
  }
}
