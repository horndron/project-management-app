import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as UserSelectors from '../../user/store/user.selectors';

@Injectable()
export class AuthGuard implements CanLoad {
  private currentUser$ = this.store.select(UserSelectors.selectCurrentUser);

  constructor(
    private readonly router: Router,
    private readonly store: Store,
  ) {}

  public canActivate(): boolean {
    return this.canLoad();
  }

  public canLoad(): boolean {
    let token = '';
    this.currentUser$.subscribe((currUser) => {
      token = (currUser) ? currUser.token : '';
    });
    if (token !== '') {
      return true;
    }
    this.router.navigate(['/user', 'login'], {
      queryParams: {
        accessDenied: true,
      },
    });

    return false;
  }
}
