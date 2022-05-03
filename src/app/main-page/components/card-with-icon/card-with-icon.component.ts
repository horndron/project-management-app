import { Component, Input } from '@angular/core';
import { enterComponent } from '../../animations';

@Component({
  selector: 'rsm-card-with-icon',
  templateUrl: './card-with-icon.component.html',
  styleUrls: ['./card-with-icon.component.scss'],
  animations: [enterComponent],
})
export class CardWithIconComponent {
  @Input() imageUrl?: string;

  @Input() title!: string;

  @Input() description?: string;
}
