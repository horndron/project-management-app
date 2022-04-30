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
  user: LoginResponseModel;
}

export interface UserState {
  userInfo: UserModel | null,
  isFetched: boolean,
}

export enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
}

export enum UrlPath {
  SIGNIN = 'signin',
  SIGNUP = 'signup',
}
