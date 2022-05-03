import { createAction, props } from '@ngrx/store';
import { LoginResponseModel, UserModel } from '../models/user.model';

const actionSource = '[User]';

export const RegisterUser = createAction(
  `${actionSource} Fetch User`,
  props<{ user: LoginResponseModel }>(),
);

export const LoginUserSuccess = createAction(
  `${actionSource} Fetch User Success`,
  props<{ userInfo: UserModel }>(),
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
