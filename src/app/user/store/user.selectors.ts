import { createFeatureSelector, createSelector } from '@ngrx/store';
import { StoreFeature } from 'src/app/app.constants';
import { UserState } from '../models/user.models';

const selectUserStore = createFeatureSelector<UserState>(StoreFeature.User);

export const selectCurrentUser = createSelector(
  selectUserStore,
  (state: UserState) => state.userInfo,
);

export const selectIsLoggedIn = createSelector(
  selectUserStore,
  (state: UserState) => state.isLoggedIn,
);

export const selectLoginError = createSelector(
  selectUserStore,
  (state: UserState) => state.error,
);
