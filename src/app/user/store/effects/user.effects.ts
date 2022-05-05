import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { catchError, map, mergeMap, Observable, of, tap, withLatestFrom } from 'rxjs';
import { UserHttpService } from '../../services/user-http.service';
import * as UserActions from '../user.actions';
import * as UserSelectors from '../user.selectors';

@Injectable()
export class UserEffects {
  private currentUser$ = this.store.select(UserSelectors.selectCurrentUser);
  public editUser$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.EditUser),
      withLatestFrom(this.currentUser$),
      mergeMap(([action, currUser]) =>
        this.userHttpService.editUser(currUser!.user.id, action.user, currUser!.token).pipe(
          map((response) => {
            return UserActions.EditUserSuccess({ user: {
              id: response.id,
              name: response.name,
              login: response.login,
            } });
          }),
          tap(() => this.router.navigateByUrl('/')),
        )
      ),
      catchError((responseError) => of(UserActions.EditUserFailed({ error: responseError.error.message }))),
    )
  );

  public deleteUser$: Observable<Action> = createEffect(() =>
  this.actions$.pipe(
    ofType(UserActions.DeleteUser),
    withLatestFrom(this.currentUser$),
    mergeMap(([action, currUser]) =>
      this.userHttpService.deleteUser(currUser!.user.id, currUser!.token).pipe(
        map(() => UserActions.DeleteUserSuccess()),
        tap(() => this.router.navigateByUrl('/')),
      )
    ),
    catchError((responseError) => of(UserActions.DeleteUserFailed({ error: responseError.error.message }))),
  )
);

  constructor(
    private readonly actions$: Actions,
    private readonly userHttpService: UserHttpService,
    private readonly router: Router,
    private readonly store: Store,
  ) {}
}
