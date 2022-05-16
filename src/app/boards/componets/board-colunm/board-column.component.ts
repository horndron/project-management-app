import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, Input } from '@angular/core';
import { Column } from 'src/app/models/column';
import { Task } from 'src/app/models/task';
import { COLUMN } from './mock';

@Component({
  selector: 'rsm-board-column',
  templateUrl: './board-column.component.html',
  styleUrls: ['./board-column.component.scss'],
})
export class BoardColumnComponent {
  @Input() column: Column;
  tasks = COLUMN.tasks as Task[];
  drop(event: CdkDragDrop<Task[]>) {
    console.log('tasks', event.container.data);
    console.log('tasks', event.container.data);
    console.log('event', event);
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
}
