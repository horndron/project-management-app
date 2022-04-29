import { createAction, props } from '@ngrx/store';
import { UserModel } from '../models/user.model';

const actionSource = '[User]';

export const FetchUser = createAction(
  `${actionSource} Fetch User`,
);

export const FetchUserSuccess = createAction(
  `${actionSource} Fetch User Success`,
  props<{ user: UserModel }>(),
);

export const FetchUserFailed = createAction(
  `${actionSource} Fetch User Failed`,
);

export const EditUser = createAction(
  `${actionSource} Edit User`,
);

export const EditUserSuccess = createAction(
  `${actionSource} Fetch User Success`,
  props<{ user: UserModel }>(),
);

export const EditUserFailed = createAction(
  `${actionSource} Fetch User Failed`,
);

export const DeleteUser = createAction(
  `${actionSource} Delete User`,
);

export const DeleteUserSuccess = createAction(
  `${actionSource} Delete User Success`,
  props<{ user: UserModel }>(),
);

export const DeleteUserFailed = createAction(
  `${actionSource} Delete User Failed`,
);
