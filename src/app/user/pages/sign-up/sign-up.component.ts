import { Component } from '@angular/core';
import {
  AbstractControl, FormBuilder, FormGroup, Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { LoginRequestModel } from '../../models/user.models';
import { PasswordValidator } from '../../validators/password.validator';
import * as UserActions from '../../store/user.actions';
import * as UserSelectors from '../../store/user.selectors';

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

  public errorMessage$ = this.store.select(UserSelectors.selectLoginError);

  constructor(
    private readonly fb: FormBuilder,
    private readonly store: Store,
  ) {}

  public get name(): AbstractControl | null {
    return this.authForm.get('name');
  }

  public onSignUp(): void {
    const user: LoginRequestModel = {
      name: this.authForm.value.name,
      login: this.authForm.value.email,
      password: this.authForm.value.password,
    };

    this.store.dispatch(UserActions.RegisterUser({ user }));
  }
}
