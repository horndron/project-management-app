import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import * as UserSelectors from '../../../user/store/user.selectors';
import * as UserActions from '../../../user/store/user.actions';
import { ROUTES } from '../../../constants/routes';

@Component({
  selector: 'rsm-user-information',
  templateUrl: './user-information.component.html',
  styleUrls: ['./user-information.component.scss'],
})
export class UserInformationComponent {
  userName$ = this.store.select(UserSelectors.selectUserName);
  readonly routes = ROUTES;
  isMenuVisible = false;

  constructor(
    private readonly store: Store,
    private readonly router: Router,
  ) {}

  onLogout() {
    this.store.dispatch(UserActions.ClearData());
    this.router.navigateByUrl(`${this.routes.USER}/${this.routes.LOGIN}`);
  }
}
