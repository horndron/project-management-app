import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';
import { COLUMN } from './mock';

@Component({
  selector: 'rsm-board-colunm',
  templateUrl: './board-colunm.component.html',
  styleUrls: ['./board-colunm.component.scss'],
})
export class BoardColunmComponent {
  title = COLUMN.name;

  tasks = COLUMN.tasks;

  list = [];

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.tasks, event.previousIndex, event.currentIndex);
  }
}
