import { Injectable } from '@angular/core';
import {
  CanActivate, CanActivateChild, CanLoad, Router,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import * as UserSelectors from '../../user/store/user.selectors';

@Injectable()
export class AuthGuard implements CanLoad, CanActivate, CanActivateChild {
  private readonly isLoggedIn$ = this.store.select(UserSelectors.selectIsLoggedIn);

  constructor(
    private readonly router: Router,
    private readonly store: Store,
  ) {}

  public canActivate(): Observable<boolean> {
    return this.checkAccess();
  }

  public canActivateChild(): Observable<boolean> {
    return this.checkAccess();
  }

  public canLoad(): Observable<boolean> {
    return this.checkAccess();
  }

  private checkAccess(): Observable<boolean> {
    return this.isLoggedIn$.pipe(
      map((isUserLoggedIn) => {
        if (!isUserLoggedIn) {
          this.router.navigate(['/user', 'login'], {
            queryParams: {
              accessDenied: true,
            },
          });
        }

        return isUserLoggedIn;
      }),
      first(),
    );
  }
}
