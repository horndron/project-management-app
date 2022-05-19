import { Store } from '@ngrx/store';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { ProgressService } from 'src/app/core/services/progress/progress.service';
import { Board } from '../../../models/board';
import * as fromBoards from '../../store/boards.selectors';
import * as BoardsActions from '../../store/boards.actions';

@Component({
  selector: 'rsm-boards-page',
  templateUrl: './boards-page.component.html',
  styleUrls: ['./boards-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardsPageComponent implements OnInit {
  boards$: Observable<Board[]>;
  isDialogVisible = false;

  constructor(
    private readonly store: Store,
    public readonly progressService: ProgressService,
  ) { }

  ngOnInit(): void {
    this.boards$ = this.store.select(fromBoards.getBoards);

    this.store.dispatch(BoardsActions.getBoards());
  }

  deleteBoard(id: string): void {
    this.store.dispatch(BoardsActions.deleteBoard({ id }));
  }

  addBoard(board: Partial<Board>): void {
    this.store.dispatch(BoardsActions.addBoard({ board }));
  }

  showDialog(): void {
    this.isDialogVisible = true;
  }
}
