import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';
import { Task } from '../../../models/task';
import { COLUMN } from './mock';

@Component({
  selector: 'rsm-board-colunm',
  templateUrl: './board-colunm.component.html',
  styleUrls: ['./board-colunm.component.scss'],
})
export class BoardColunmComponent {
  title = COLUMN.name;

  tasks: Task[] = COLUMN.tasks as Task[];

  list = [];

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.tasks, event.previousIndex, event.currentIndex);
  }
}
