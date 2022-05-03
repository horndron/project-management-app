import { createReducer, on } from '@ngrx/store';
import { UserState } from 'src/app/auth/models/user.model';
import * as UserActions from './user.actions';

export const initialUserState: UserState = {
  userInfo: null,
  isFetched: false,
};

export const userReducer = createReducer(
  initialUserState,
  on(UserActions.RegisterUser, (state, { user }): UserState => ({
    ...state,
    userInfo: {
      user,
      token: '',
    },
  })),
  on(UserActions.LoginUserSuccess, (state, { userInfo }): UserState => ({
    ...state,
    userInfo,
    isFetched: true,
  })),
  on(UserActions.FetchUserFailed, (state): UserState => ({
    ...state,
    isFetched: true,
  })),
);
