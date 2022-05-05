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

