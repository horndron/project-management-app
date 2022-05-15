import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import {
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { ConfirmationService } from 'src/app/core/services/confirmation/confirmation.service';
import { Column } from 'src/app/models/column';

@Component({
  selector: 'rsm-board-column',
  templateUrl: './board-column.component.html',
  styleUrls: ['./board-column.component.scss'],
})
export class BoardColumnComponent {
  @Input() column: Column;

  @Output() deleteColumn = new EventEmitter<string>();

  constructor(
    private readonly confirmationService: ConfirmationService,
  ) { }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.column.tasks, event.previousIndex, event.currentIndex);
  }

  remove(): void {
    this.confirmationService.delete(() => this.deleteColumn.emit());
  }
}
