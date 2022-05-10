import { Component, Input } from '@angular/core';

export interface Task {
  id?: string;
  title: string;
  order?: number;
  description: string;
  userId?: string;
  boardId?: string;
  columnId?: string;
}

@Component({
  selector: 'rsm-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent {
  @Input() task!: Task;
}
