import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import {
  catchError, map, mergeMap, Observable, of, switchMap, tap,
} from 'rxjs';
import { UserHttpService } from '../../services/user-http.service';
import * as UserActions from '../user.actions';

@Injectable()
export class AuthEffects {
  // eslint-disable-next-line ngrx/prefer-effect-callback-in-block-statement
  public createUser$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(UserActions.RegisterUser),
    mergeMap(({ user }) => this.userHttpService.createUser(user).pipe(
      map(() => UserActions.LoginUser({
        user: {
          login: user.login,
          password: user.password,
        },
      })),
      catchError((responseError) => of(UserActions.LoginUserFailed({
        error: responseError.error.message,
      }))),
    )),
  ));

  // eslint-disable-next-line ngrx/prefer-effect-callback-in-block-statement
  public loginUser$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(UserActions.LoginUser),
    mergeMap(({ user }) => this.userHttpService.signIn(user).pipe(
      map(({ token }) => UserActions.GetUserSuccess({ token, login: user.login })),
      catchError((responseError) => of(UserActions.LoginUserFailed({
        error: responseError.error.message,
      }))),
    )),
  ));

  // eslint-disable-next-line ngrx/prefer-effect-callback-in-block-statement
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
      tap(() => this.router.navigateByUrl('/user/edit')),
    )),
    catchError((responseError) => of(UserActions.LoginUserFailed({
      error: responseError.error.message,
    }))),
  ));

  constructor(
    private readonly actions$: Actions,
    private readonly userHttpService: UserHttpService,
    private readonly router: Router,
  ) {}
}
