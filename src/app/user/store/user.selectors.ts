import { createFeatureSelector, createSelector } from '@ngrx/store';
import { StoreFeature } from '../../constants/store.enum';
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

export const selectUserName = createSelector(
  selectUserStore,
  (state: UserState) => state.userInfo?.user?.name,
);
