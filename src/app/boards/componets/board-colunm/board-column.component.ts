import { Component, Input } from '@angular/core';
import { Column } from 'src/app/models/column';

@Component({
  selector: 'rsm-board-column',
  templateUrl: './board-column.component.html',
  styleUrls: ['./board-column.component.scss'],
})
export class BoardColumnComponent {
  @Input() column: Column;
}
