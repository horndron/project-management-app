import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  Actions, createEffect, ofType, concatLatestFrom,
} from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import {
  catchError, EMPTY, map, mergeMap, Observable, of, tap,
} from 'rxjs';
import { UserHttpService } from '../../services/user-http.service';
import * as UserActions from '../user.actions';
import * as UserSelectors from '../user.selectors';

@Injectable()
export class UserEffects {
  private currentUser$ = this.store.select(UserSelectors.selectCurrentUser);

  public editUser$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(UserActions.EditUser),
    concatLatestFrom(() => this.currentUser$),
    mergeMap(([action, currUser]) => {
      if (currUser) {
        const { id } = currUser.user;
        const { token } = currUser;
        return this.userHttpService.editUser(id, action.user, token).pipe(
          map((response) => UserActions.EditUserSuccess({
            user: {
              id: response.id,
              name: response.name,
              login: response.login,
            },
          })),
          tap(() => this.router.navigateByUrl('/')),
        );
      }
      return EMPTY;
    }),
    catchError((responseError) => of(UserActions.EditUserFailed({
      error: responseError.error.message,
    }))),
  ));

  public deleteUser$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(UserActions.DeleteUser),
    concatLatestFrom(() => this.currentUser$),
    mergeMap(([, currUser]) => this.userHttpService.deleteUser(currUser!.user.id, currUser!.token)
      .pipe(
        map(() => UserActions.DeleteUserSuccess()),
        tap(() => this.router.navigateByUrl('/')),
      )),
    catchError((responseError) => of(UserActions.DeleteUserFailed({
      error: responseError.error.message,
    }))),
  ));

  constructor(
    private readonly actions$: Actions,
    private readonly userHttpService: UserHttpService,
    private readonly router: Router,
    private readonly store: Store,
  ) {}
}
