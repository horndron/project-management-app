import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  Actions, createEffect, ofType, concatLatestFrom,
} from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { TypedAction } from '@ngrx/store/src/models';
import { TranslateService } from '@ngx-translate/core';
import {
  catchError,
  EMPTY,
  map,
  mergeMap,
  Observable,
  of,
  switchMap,
  tap,
} from 'rxjs';
import { NotificationService } from 'src/app/core/services/notification/notification.service';
import { UserHttpService } from '../../services/user-http.service';
import * as UserActions from '../user.actions';
import * as UserSelectors from '../user.selectors';

@Injectable()
export class UserEffects {
  private currentUser$ = this.store.select(UserSelectors.selectCurrentUser);

  constructor(
    private readonly actions$: Actions,
    private readonly userHttpService: UserHttpService,
    private readonly router: Router,
    private readonly store: Store,
    private readonly notificationService: NotificationService,
    private readonly translateService: TranslateService,
  ) {}

  public getAllUsers$: Observable<Action> = createEffect(
    () => this.actions$.pipe(
      ofType(UserActions.LoadUsers),
      switchMap(() => this.userHttpService.getAllUsers$()),
      switchMap((users) => [UserActions.SetUsers({ users })]),
    ),
  );

  public editUser$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(UserActions.EditUser),
    concatLatestFrom(() => this.currentUser$),
    mergeMap(([action, currUser]) => {
      if (currUser && currUser.user) {
        const { id } = currUser.user;

        return this.userHttpService.editUser(id, action.user).pipe(
          map((response) => UserActions.EditUserSuccess({
            user: {
              id: response.id,
              name: response.name,
              login: response.login,
            },
          })),
          tap(() => this.notificationService.success(
            this.translateService.instant('USER.MESSAGES.SUCCESS_EDIT'),
          )),
        );
      }

      return EMPTY;
    }),
    catchError((responseError) => this.handleError(responseError.error.message)),
  ));

  public deleteUser$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(UserActions.DeleteUser),
    concatLatestFrom(() => this.currentUser$),
    mergeMap(([, currUser]) => {
      if (currUser && currUser.user) {
        return this.userHttpService.deleteUser(currUser.user.id).pipe(
          map(() => UserActions.DeleteUserSuccess()),
          tap(() => this.router.navigateByUrl('/')),
        );
      }

      return EMPTY;
    }),
    catchError((responseError) => this.handleError(responseError.error.message)),
  ));

  private handleError(
    message: string,
  ): Observable<TypedAction<'[User] Login User Failed'>> {
    this.notificationService.error(message);

    return of(
      UserActions.LoginUserFailed({
        error: message,
      }),
    );
  }
}
