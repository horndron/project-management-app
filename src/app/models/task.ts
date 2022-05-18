import { LoginResponseModel } from './user';

export interface Task {
  id: string;
  title: string;
  done: boolean;
  order: number;
  description: string;
  userId: string;
  boardId: string;
  columnId: string;
  user: LoginResponseModel;
}

export interface TaskUpdate extends Task {
  previousColumnId?: string;
}
