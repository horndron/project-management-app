import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import {
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { ConfirmationService } from 'src/app/core/services/confirmation/confirmation.service';
import { Column } from 'src/app/models/column';
import { Task } from 'src/app/models/task';

@Component({
  selector: 'rsm-board-column',
  templateUrl: './board-column.component.html',
  styleUrls: ['./board-column.component.scss'],
})
export class BoardColumnComponent {
  @Input() boardId: string;
  @Input() column: Column;

  @Output() deleteColumn = new EventEmitter<string>();
  @Output() deleteTask = new EventEmitter<Task>();

  constructor(
    private readonly confirmationService: ConfirmationService,
    private readonly store: Store,
  ) { }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.column.tasks, event.previousIndex, event.currentIndex);
  }

  remove(): void {
    this.confirmationService.delete(() => this.deleteColumn.emit());
  }

  handleDeleteTask(task: Task): void {
    this.deleteTask.emit({ ...task, columnId: this.column.id });
  }
}
