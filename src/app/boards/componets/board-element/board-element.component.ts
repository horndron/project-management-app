import { Router } from '@angular/router';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

import { Board } from 'src/app/models/board';
import { ConfirmationService } from '../../../core/services/confirmation/confirmation.service';
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
  @Input() description: string;

  @Output() deleteBoard = new EventEmitter<string>();
  @Output() changeBoardTitle = new EventEmitter<{ id: string, currentBoard: Partial<Board> }>();

  constructor(
    private readonly confirmationService: ConfirmationService,
    private readonly router: Router,
  ) { }

  delete(event: Event): void {
    event.stopPropagation();

    this.confirmationService.delete(() => this.deleteBoard.emit(this.id));
  }

  changeTitle(title: string): void {
    this.changeBoardTitle.emit({
      id: this.id,
      currentBoard: {
        title,
        description: this.description,
      },
    });
  }

  navigateToBoard() {
    this.router.navigate([ROUTES.BOARDS, this.id]);
  }
}
