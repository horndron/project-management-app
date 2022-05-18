import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import {
  Component, EventEmitter, Input, Output,
} from '@angular/core';
import { Column } from 'src/app/models/column';
import { Task } from '../../../models/task';
import { COLUMN } from './mock';

@Component({
  selector: 'rsm-board-column',
  templateUrl: './board-column.component.html',
  styleUrls: ['./board-column.component.scss'],
})
export class BoardColumnComponent {
  // @Input() column: Column;
  column = {
    id: '1',
    title: 'Title',
    order: 1,
  };
  @Output() changeColumnTitle = new EventEmitter<{ currentColumn: Partial<Column> }>();

  title = COLUMN.name;
  tasks: Task[] = COLUMN.tasks as Task[];
  list = [];

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.tasks, event.previousIndex, event.currentIndex);
  }

  changeTitle(title: string): void {
    this.changeColumnTitle.emit({
      currentColumn: {
        id: this.column.id,
        title,
        order: this.column.order,
      },
    });
  }
}
