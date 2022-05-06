import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as UserSelectors from '../../user/store/user.selectors';

@Injectable()
export class AuthGuard implements CanLoad {
  private isLoggedIn$ = this.store.select(UserSelectors.selectIsLoggedIn);

  constructor(
    private readonly router: Router,
    private readonly store: Store,
  ) {}

  public canActivate(): boolean {
    return this.canLoad();
  }

  public canLoad(): boolean {
    let canNavigate = false;

    this.isLoggedIn$.subscribe((loginData) => {
      canNavigate = loginData;
    });

    if (!canNavigate) {
      this.router.navigate(['/user', 'login'], {
        queryParams: {
          accessDenied: true,
        },
      });
    }

    return canNavigate;
  }
}
