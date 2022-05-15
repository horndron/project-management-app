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
import * as BoardsActions from '../../store/boards.actions';

@Component({
  selector: 'rsm-board-column',
  templateUrl: './board-column.component.html',
  styleUrls: ['./board-column.component.scss'],
})
export class BoardColumnComponent {
  @Input() boardId: string;
  @Input() column: Column;

  @Output() deleteColumn = new EventEmitter<string>();

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

  deleteTask(id: string): void {
    this.store.dispatch(BoardsActions.deleteTask({
      id,
      columnId: this.column.id,
      boardId: this.boardId,
    }));
  }
}
