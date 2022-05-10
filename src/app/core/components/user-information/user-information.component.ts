import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { ROUTES } from '../../../constants/routes';

@Component({
  selector: 'rsm-user-information',
  templateUrl: './user-information.component.html',
  styleUrls: ['./user-information.component.scss'],
})
export class UserInformationComponent {
  readonly routes = ROUTES;

  userName = 'UserName';
  isMenuVisible = false;

  constructor(
    private readonly store: Store,
  ) {}
}
