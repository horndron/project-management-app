import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, Input } from '@angular/core';
import { Column } from 'src/app/models/column';

@Component({
  selector: 'rsm-board-column',
  templateUrl: './board-column.component.html',
  styleUrls: ['./board-column.component.scss'],
})
export class BoardColumnComponent {
  @Input() column: Column;

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.column.tasks, event.previousIndex, event.currentIndex);
  }
}
