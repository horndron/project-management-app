import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'rsm-user-information',
  templateUrl: './user-information.component.html',
  styleUrls: ['./user-information.component.scss'],
})
export class UserInformationComponent {
  userName = 'UserName';

  menu = false;

  constructor(
    private readonly store: Store,
  ) {}
}
