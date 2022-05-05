import { createReducer, on } from '@ngrx/store';
import { UserState } from 'src/app/user/models/user.models';
import * as UserActions from './user.actions';

export const initialUserState: UserState = {
  userInfo: null,
  isLoggedIn: false,
  error: '',
};

export const userReducer = createReducer(
  initialUserState,
  on(UserActions.RegisterUser, (state): UserState => ({
    ...state,
  })),
  on(UserActions.LoginUser, (state): UserState => ({
    ...state,
  })),
  on(UserActions.LoginUserSuccess, (state, { userInfo }): UserState => ({
    ...state,
    userInfo,
    isLoggedIn: true,
    error: '',
  })),
  on(UserActions.LoginUserFailed, (state, { error }): UserState => ({
    ...state,
    isLoggedIn: false,
    error,
  })),
  on(UserActions.EditUser, (state): UserState => ({
    ...state,
  })),
  on(UserActions.EditUserSuccess, (state, { user }): UserState => ({
    ...state,
    userInfo: {
      user,
      token: state.userInfo!.token,
    },
    error: '',
  })),
  on(UserActions.EditUserFailed, (state, { error }): UserState => ({
    ...state,
    error,
  })),
);
