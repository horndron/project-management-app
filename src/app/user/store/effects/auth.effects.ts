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

  public loginUser$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(UserActions.LoginUser),
    mergeMap(({ user }) => this.userHttpService.signIn(user).pipe(
      switchMap((response) => this.userHttpService.getAllUsers(response.token).pipe(
        map((users) => users.find((responseUser) => responseUser.login === user.login)),
        map((currentUser) => UserActions.LoginUserSuccess({
          userInfo: {
            user: currentUser!,
            token: response.token,
          },
        })),
        tap(() => this.router.navigateByUrl('/user/edit')),
      )),
      catchError((responseError) => of(UserActions.LoginUserFailed({
        error: responseError.error.message,
      }))),
    )),
  ));

  constructor(
    private readonly actions$: Actions,
    private readonly userHttpService: UserHttpService,
    private readonly router: Router,
  ) {}
}
