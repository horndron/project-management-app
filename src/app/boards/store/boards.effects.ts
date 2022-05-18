import { TranslateService } from '@ngx-translate/core';
import { Injectable } from '@angular/core';
import {
  Actions, createEffect, ofType, concatLatestFrom,
} from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import {
  forkJoin, Observable, catchError, of, EMPTY,
} from 'rxjs';
import {
  map, switchMap, tap,
} from 'rxjs/operators';
import { isEmpty, set } from 'lodash';
import { Column } from 'src/app/models/column';
import { TasksService } from '../services/tasks/tasks.service';
import { ColumnsService } from '../services/columns/columns.service';
import { UserHttpService } from '../../user/services/user-http.service';

import { BoardsService } from '../services/boards/boards.service';
import { Board } from '../../models/board';
import { Task } from '../../models/task';
import * as BoardsActions from './boards.actions';
import * as fromBoards from './boards.selectors';
import { NotificationService } from '../../core/services/notification/notification.service';
import { Nullable } from '../../models/core';

@Injectable()
export class BoardsEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly store: Store,
    private readonly boardsService: BoardsService,
    private readonly notificationService: NotificationService,
    private readonly translateService: TranslateService,
    private readonly userService: UserHttpService,
    private readonly columnsService: ColumnsService,
    private readonly tasksService: TasksService,
  ) {}

  getBoards$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(BoardsActions.getBoards),
    switchMap(() => this.boardsService.getAll$()),
    switchMap((boards) => [BoardsActions.setBoards({ boards })]),
  ));

  addBoard$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(BoardsActions.addBoard),
    switchMap(({ board }) => this.boardsService.create$(board)),
    switchMap((createdBoard: Nullable<Board>) => {
      if (!createdBoard) {
        this.notificationService.error(
          this.translateService.instant('MESSAGES.ERROR_CREATE'),
        );
        return [];
      }

      return [BoardsActions.pushBoard({ board: createdBoard })];
    }),
  ));

  deleteBoard$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(BoardsActions.deleteBoard),
    switchMap(({ id }) => this.boardsService.remove$(id)),
    concatLatestFrom(() => this.store.select(fromBoards.getBoards)),
    switchMap(([deletedId, boards]) => {
      if (isEmpty(deletedId)) {
        this.notificationService.error(
          this.translateService.instant('MESSAGES.ERROR_DELETE'),
        );
        return [];
      }

      this.notificationService.success(
        this.translateService.instant('MESSAGES.SUCCESS_DELETE'),
      );

      const updatedBoards: Board[] = boards.filter(
        (board: Board) => board.id !== deletedId,
      );

      return [BoardsActions.setBoards({ boards: updatedBoards })];
    }),
  ));

  getCurrentBoard$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(BoardsActions.loadCurrentBoard),
    switchMap(({ id }) => this.boardsService.getOne$(id)),
    switchMap((board) => this.columnsService.getAll$(board.id).pipe(
      switchMap((columns) => forkJoin(
        columns.map((column) => this.tasksService.getAll$(board.id, column.id).pipe(
          switchMap((tasks: Task[]) => forkJoin(tasks.map(
            (task) => this.userService.getUser$(task.userId).pipe(
              tap((user) => set(task, 'user', user)),
              map(() => task),
            ),
          ))),
          tap((tasks: Task[]) => set(column, 'tasks', tasks)),
        )),
      ).pipe(
        tap(() => set(board, 'columns', columns)),
      )),
      switchMap(() => [BoardsActions.setCurrentBoard({ board })]),
    )),
    catchError(() => of(BoardsActions.setCurrentBoard({ board: null }))),
  ));

  changeBoardTitle$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(BoardsActions.changeBoardTitle),
    switchMap(({ id, board }) => this.boardsService.changeOne$(id, board)),
    concatLatestFrom(() => this.store.select(fromBoards.getBoards)),
    switchMap(([changedBoard, boards]) => {
      if (isEmpty(changedBoard)) {
        this.notificationService.error(
          this.translateService.instant('MESSAGES.ERROR_EDIT_TITLE'),
        );
        return [];
      }

      this.notificationService.success(
        this.translateService.instant('MESSAGES.SUCCESS_EDIT_TITLE'),
      );

      const updatedBoards: Board[] = boards.map((board: Board) => {
        if (board.id === changedBoard?.id) {
          board = { ...changedBoard };
        }

        return board;
      });

      return [BoardsActions.setBoards({ boards: updatedBoards })];
    }),
  ));

  changeColumnTitle$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(BoardsActions.changeColumnTitle),
    switchMap(({ boardId, column }) => this.columnsService.changeOne$(boardId, column)),
    concatLatestFrom(() => this.store.select(fromBoards.getCurrentBoard)),
    switchMap(([changedColumn, currentBoard]) => {
      if (isEmpty(changedColumn)) {
        this.notificationService.error(
          this.translateService.instant('MESSAGES.ERROR_EDIT_TITLE'),
        );
        return [];
      }

      this.notificationService.success(
        this.translateService.instant('MESSAGES.SUCCESS_EDIT_TITLE'),
      );

      if (currentBoard) {
        const updatedColumns: Column[] = currentBoard.columns.map((column: Column) => {
          if (column.id === changedColumn?.id) {
            column = { ...changedColumn };
          }

          return column;
        });

        const updatedBoard = {
          ...currentBoard,
          columns: updatedColumns,
        };

        return [BoardsActions.setCurrentBoard({ board: updatedBoard })];
      }

      return EMPTY;
    }),
  ));
}
