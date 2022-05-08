import { Router } from '@angular/router';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

import { ConfirmService } from '../../../core/services/confirm/confirm.service';
import { ROUTES } from '../../../constants/routes';

@Component({
  selector: 'rsm-board-element',
  templateUrl: './board-element.component.html',
  styleUrls: ['./board-element.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardElementComponent {
  @Input() id: string;
  @Input() title: string;

  @Output() deleteBoard = new EventEmitter<string>();

  constructor(
    private readonly confirmationService: ConfirmService,
    private readonly router: Router,
  ) { }

  delete(event: Event): void {
    event.stopPropagation();

    this.confirmationService.delete(() => this.deleteBoard.emit(this.id));
  }

  navigateToBoard() {
    this.router.navigate([ROUTES.BOARDS, this.id]);
  }
}
