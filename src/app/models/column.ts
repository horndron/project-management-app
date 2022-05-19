import { Task } from './task';

export interface Column {
  id: string;
  boardId: string;
  title: string;
  description: string;
  order: number;
  tasks: Task[];
}
