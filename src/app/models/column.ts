import { Task } from './task';

export interface Column {
  id: string;
  title: string;
  order: number;
  tasks: Task[];
}
