import { LoginResponseModel } from '../user/models/user.models';

export interface Task {
  id: string;
  title: string;
  order: number;
  description: string;
  userId: string;
  user: LoginResponseModel;
}
