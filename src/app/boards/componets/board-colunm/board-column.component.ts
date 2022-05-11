import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';
import { Task } from '../../../models/task';
import { COLUMN } from './mock';

@Component({
  selector: 'rsm-board-column',
  templateUrl: './board-column.component.html',
  styleUrls: ['./board-column.component.scss'],
})
export class BoardColumnComponent {
  title = COLUMN.name;

  tasks: Task[] = COLUMN.tasks as Task[];

  list = [];

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.tasks, event.previousIndex, event.currentIndex);
  }
}
