import { LoginResponseModel } from './user';

export interface Task {
  id: string;
  title: string;
  order: number;
  description: string;
  userId: string;
  user: LoginResponseModel;
}
