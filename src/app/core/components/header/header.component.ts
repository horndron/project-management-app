import { OnInit, AfterViewInit, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { isEmpty } from 'lodash';
import {
  distinctUntilChanged,
  fromEvent,
  map,
  Observable,
  throttleTime,
} from 'rxjs';
import { UserModel } from 'src/app/models/user';
import * as UserSelectors from '../../../user/store/user.selectors';
import * as UserActions from '../../../user/store/user.actions';
import {
  HEADER_SCROLL_FOR_STICKY,
  HEADER_THROTTLE_TIME,
  USER_INFO,
} from './header.constants';

@Component({
  selector: 'rsm-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, AfterViewInit {
  isAuth$ = this.store.select(UserSelectors.selectIsLoggedIn);
  isSticky$!: Observable<boolean>;

  constructor(private readonly store: Store) {}

  ngOnInit() {
    const userInfo: UserModel = JSON.parse(
      localStorage.getItem(USER_INFO) || '{}',
    );

    if (!isEmpty(userInfo)) {
      this.store.dispatch(
        UserActions.GetUserById({
          token: userInfo.token,
          id: userInfo.user!.id,
        }),
      );
    }
  }

  ngAfterViewInit() {
    this.isSticky$ = fromEvent(window, 'scroll').pipe(
      throttleTime(HEADER_THROTTLE_TIME),
      map(() => window.pageYOffset > HEADER_SCROLL_FOR_STICKY),
      distinctUntilChanged(),
    );
  }
}
