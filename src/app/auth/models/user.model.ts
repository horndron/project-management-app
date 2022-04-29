export interface LoginRequestModel {
  email: string;
  password: string;
  name: string;
}

export interface UserModel {
  token: string;
  user: LoginRequestModel;
  id: string;
}

export interface UserState {
  userInfo: UserModel | null,
  isFetched: boolean,
}
