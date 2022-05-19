import { Component, Input } from '@angular/core';
import { DEFAULT_FIRST_LETTER } from '../../main-page.constants';

@Component({
  selector: 'rsm-card-with-icon',
  templateUrl: './card-with-icon.component.html',
  styleUrls: ['./card-with-icon.component.scss'],
})
export class CardWithIconComponent {
  @Input() imageUrl?: string;

  @Input() title = DEFAULT_FIRST_LETTER;

  @Input() description?: string;
}
