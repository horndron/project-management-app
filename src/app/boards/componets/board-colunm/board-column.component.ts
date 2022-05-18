import {
  Component, EventEmitter, Input, Output,
} from '@angular/core';
import { Column } from 'src/app/models/column';

@Component({
  selector: 'rsm-board-column',
  templateUrl: './board-column.component.html',
  styleUrls: ['./board-column.component.scss'],
})
export class BoardColumnComponent {
  @Input() column: Column;

  @Output() changeColumnTitle = new EventEmitter<{ currentColumn: Partial<Column> }>();

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
