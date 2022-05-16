import { Component } from '@angular/core';
import {
  FormBuilder, FormGroup, Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { ConfirmationService } from 'src/app/core/services/confirmation/confirmation.service';
import { LoginRequestModel } from '../../../models/user';
import * as UserActions from '../../store/user.actions';
import * as UserSelectors from '../../store/user.selectors';
import { PasswordValidator } from '../../validators/password.validator';

@Component({
  selector: 'rsm-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent {
  public authForm: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, PasswordValidator.check]],
  });

  public errorMessage$ = this.store.select(UserSelectors.selectLoginError);

  constructor(
    private readonly store: Store,
    private readonly fb: FormBuilder,
    private readonly confirmationService: ConfirmationService,
  ) { }

  public onEditUser(): void {
    const user: LoginRequestModel = {
      name: this.authForm.value.name,
      login: this.authForm.value.email,
      password: this.authForm.value.password,
    };

    this.store.dispatch(UserActions.EditUser({ user }));
  }

  public onDeleteUser(event: Event): void {
    event.stopPropagation();

    this.confirmationService.delete(() => this.store.dispatch(UserActions.DeleteUser()));
  }
}
