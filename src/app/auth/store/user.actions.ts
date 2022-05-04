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
