import { createAction, props } from '@ngrx/store';
import { LoginRequestModel, LoginResponseModel, UserModel } from '../models/user.models';

const actionSource = '[User]';

export const RegisterUser = createAction(
  `${actionSource} Register User`,
  props<{ user: LoginRequestModel }>(),
);

export const LoginUser = createAction(
  `${actionSource} Login User`,
  props<{ user: LoginRequestModel }>(),
);

export const GetUserSuccess = createAction(
  `${actionSource} Get User Success`,
  props<{ token: string, login: string }>(),
);

export const GetUserById = createAction(
  `${actionSource} Get User By Id`,
  props<{ token: string, id: string }>(),
);

export const GetUserByIdSuccess = createAction(
  `${actionSource} Get User By Id Success`,
  props<{ user: LoginResponseModel }>(),
);

export const GetUserByIdFailed = createAction(
  `${actionSource} Get User By Id Failed`,
);

export const LoginUserSuccess = createAction(
  `${actionSource} Login User Success`,
  props<{ userInfo: UserModel }>(),
);

export const LoginUserFailed = createAction(
  `${actionSource} Login User Failed`,
  props<{ error: string }>(),
);

export const EditUser = createAction(
  `${actionSource} Edit User`,
  props<{ user: LoginRequestModel }>(),
);

export const EditUserSuccess = createAction(
  `${actionSource} Edit User Success`,
  props<{ user: LoginResponseModel }>(),
);

export const EditUserFailed = createAction(
  `${actionSource} Edit User Failed`,
  props<{ error: string }>(),
);

export const DeleteUser = createAction(
  `${actionSource} Delete User`,
);

export const DeleteUserSuccess = createAction(
  `${actionSource} Delete User Success`,
);

export const DeleteUserFailed = createAction(
  `${actionSource} Edit User Failed`,
  props<{ error: string }>(),
);

export const ClearData = createAction(
  `${actionSource} Clear Data`,
);
