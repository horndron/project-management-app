import { Column } from './column';

export interface Board {
  id: string;
  title: string;
  description: string;
  columns: Column[];
}
