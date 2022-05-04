import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from '../models/user.model';

const selectUserStore = createFeatureSelector<UserState>('user');
export const selectCurrentUser = createSelector(
  selectUserStore,
  (state: UserState) => state.userInfo,
);
export const selectIsLoggedIn = createSelector(
  selectUserStore,
  (state: UserState) => state.isLoggedIn,
);
