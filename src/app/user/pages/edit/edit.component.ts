import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { LoginRequestModel } from '../../models/user.models';
import * as UserActions from '../../store/user.actions';
import * as UserSelectors from '../../store/user.selectors';
import { PasswordValidator } from '../../validators/password.validator';

@Component({
  selector: 'rsm-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent {
  public authForm: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, PasswordValidator.check]],
  });
  public errorMessage$ = this.store.select(UserSelectors.selectLoginError);

  constructor(private readonly store: Store, private readonly fb: FormBuilder) { }

  public get name(): AbstractControl | null {
    return this.authForm.get('name');
  }

  public onEditUser(): void {
    const user: LoginRequestModel = {
      name: this.authForm.value.name,
      login: this.authForm.value.email,
      password: this.authForm.value.password,
    };
    
    this.store.dispatch(UserActions.EditUser({ user }))
  }

  public onDeleteUser(): void {
    this.store.dispatch(UserActions.DeleteUser());
  }
}
