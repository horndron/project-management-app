import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import * as UserSelectors from '../../../user/store/user.selectors';

@Component({
  selector: 'rsm-user-information',
  templateUrl: './user-information.component.html',
  styleUrls: ['./user-information.component.scss'],
})
export class UserInformationComponent {
  userName$ = this.store.select(UserSelectors.selectUserName);

  isMenuVisible = false;

  constructor(
    private readonly store: Store,
  ) {}
}
