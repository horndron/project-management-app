import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subject, takeUntil } from 'rxjs';

import { ActivatedRoute } from '@angular/router';
import { Board } from 'src/app/models/board';
import { Nullable } from 'src/app/models/core';
import * as fromBoards from '../../store/boards.selectors';
import * as BoardsActions from '../../store/boards.actions';

@Component({
  selector: 'rsm-board-details',
  templateUrl: './board-details.component.html',
  styleUrls: ['./board-details.component.scss'],
})
export class BoardDetailsComponent implements OnInit, OnDestroy {
  board: Nullable<Board>;
  boardId: string;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private readonly store: Store,
    private readonly route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.boardId = this.route.snapshot.paramMap.get('id') as string;
    this.store.select(fromBoards.getCurrentBoard)
      .pipe(takeUntil(this.destroy$))
      .subscribe((board) => {
        this.board = board?.id === this.boardId ? board : null;
      });

    this.store.dispatch(BoardsActions.loadCurrentBoard({ id: this.boardId }));

    console.log(this.boardId);
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
