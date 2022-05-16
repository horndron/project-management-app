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
  readonly routes = ROUTES;

  isMenuVisible = false;
  userName$ = this.store.select(UserSelectors.selectUserName);

  constructor(
    private readonly store: Store,
    private readonly router: Router,
  ) {}

  public onLogout(): void {
    localStorage.clear();
    this.store.dispatch(UserActions.ClearData());
    this.router.navigateByUrl(`${this.routes.ROOT}`);
  }
}
