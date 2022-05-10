export interface Task {
  id: string;
  title: string;
  order: number;
  description: string;
  userId: { description: string };
  boardId: { description: string };
  columnId: { description: string };
}
