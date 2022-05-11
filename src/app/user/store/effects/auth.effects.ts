import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { TypedAction } from '@ngrx/store/src/models';
import { TranslateService } from '@ngx-translate/core';
import {
  catchError, map, mergeMap, Observable, of, switchMap, tap,
} from 'rxjs';
import { NotificationService } from 'src/app/core/services/notification/notification.service';
import { UserHttpService } from '../../services/user-http.service';
import * as UserActions from '../user.actions';

@Injectable()
export class AuthEffects {
  public createUser$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(UserActions.RegisterUser),
    mergeMap(({ user }) => this.userHttpService.createUser(user).pipe(
      map(() => UserActions.LoginUser({
        user: {
          login: user.login,
          password: user.password,
        },
      })),
      catchError((responseError) => this.handleError(responseError, 'USER.MESSAGES.ERROR_SIGNUP')),
    )),
  ));

  public loginUser$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(UserActions.LoginUser),
    mergeMap(({ user }) => this.userHttpService.signIn(user).pipe(
      map(({ token }) => UserActions.GetUserSuccess({ token, login: user.login })),
      catchError((responseError) => this.handleError(responseError, 'USER.MESSAGES.ERROR_LOGIN')),
    )),
  ));

  public getUser$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(UserActions.GetUserSuccess),
    switchMap((action) => this.userHttpService.getAllUsers().pipe(
      map((users) => users.find((responseUser) => responseUser.login === action.login)),
      map((currentUser) => UserActions.LoginUserSuccess({
        userInfo: {
          user: currentUser!,
          token: action.token,
        },
      })),
      tap(() => this.router.navigateByUrl('')),
    )),
    catchError((responseError) => this.handleError(responseError, responseError.error.message)),
  ));

  constructor(
    private readonly actions$: Actions,
    private readonly userHttpService: UserHttpService,
    private readonly router: Router,
    private readonly notificationService: NotificationService,
    private readonly translateService: TranslateService,
  ) {}

  private handleError(responseError: HttpErrorResponse, notification: string)
    : Observable<TypedAction<'[User] Login User Failed'>> {
    this.notificationService.error(this.translateService.instant(notification));

    return of(UserActions.LoginUserFailed({
      error: responseError.error.message,
    }));
  }
}
