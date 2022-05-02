import { Component, Input } from '@angular/core';
import { CardWithIcon } from '../../models/main-page.models';
import { enterComponent } from '../../animations';

@Component({
  selector: 'rsm-card-with-icon',
  templateUrl: './card-with-icon.component.html',
  styleUrls: ['./card-with-icon.component.scss'],
  animations: [enterComponent],
})
export class CardWithIconComponent {
  @Input() card!: CardWithIcon;
}
