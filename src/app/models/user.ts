export interface LoginRequestModel {
  login: string;
  password: string;
  name?: string;
}

export interface LoginResponseModel {
  name: string;
  login: string;
  id: string;
}

export interface UserModel {
  token: string;
  user: LoginResponseModel | null;
}

export interface UserState {
  userInfo: UserModel | null,
  users: LoginResponseModel[];
  isLoggedIn: boolean,
  error: string,
}
