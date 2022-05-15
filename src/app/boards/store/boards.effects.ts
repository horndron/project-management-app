import { TranslateService } from '@ngx-translate/core';
import { Injectable } from '@angular/core';
import {
  Actions,
  createEffect,
  ofType,
  concatLatestFrom,
} from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import {
  Observable,
  catchError,
  of,
  forkJoin,
} from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { isEmpty, set } from 'lodash';
import { TasksService } from '../services/tasks/tasks.service';
import { ColumnsService } from '../services/columns/columns.service';
import { UserHttpService } from '../../user/services/user-http.service';

import { BoardsService } from '../services/boards/boards.service';
import { Board } from '../../models/board';
import * as BoardsActions from './boards.actions';
import * as fromBoards from './boards.selectors';
import { NotificationService } from '../../core/services/notification/notification.service';
import { Nullable } from '../../models/core';
import { Task } from '../../models/task';

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

  deleteColumn$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(BoardsActions.deleteColumn),
    switchMap(({ id, boardId }) => this.columnsService.remove$(id, boardId)),
    concatLatestFrom(() => this.store.select(fromBoards.getCurrentBoard)),
    switchMap(([deletedId, board]) => {
      if (isEmpty(deletedId) || !board) {
        this.notificationService.error(
          this.translateService.instant('MESSAGES.ERROR_DELETE'),
        );

        return [];
      }

      this.notificationService.success(
        this.translateService.instant('MESSAGES.SUCCESS_DELETE'),
      );

      const updatedBoard: Board = {
        ...board,
        columns: board?.columns?.filter((column) => column.id !== deletedId) || [],
      };

      return [BoardsActions.setCurrentBoard({ board: updatedBoard })];
    }),
  ));

  deleteTask$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(BoardsActions.deleteTask),
    switchMap(({ id, boardId, columnId }) => this.tasksService.remove$(id, boardId, columnId)),
    concatLatestFrom(() => this.store.select(fromBoards.getCurrentBoard)),
    switchMap(([deletedParameters, board]) => {
      if (!deletedParameters || !board) {
        this.notificationService.error(
          this.translateService.instant('MESSAGES.ERROR_DELETE'),
        );

        return [];
      }

      this.notificationService.success(
        this.translateService.instant('MESSAGES.SUCCESS_DELETE'),
      );

      const filteredColumns = board?.columns?.filter(
        (column) => column.id !== deletedParameters?.columnId,
      );
      const taskColumn = board?.columns?.filter(
        (column) => column.id === deletedParameters?.columnId,
      )[0];

      const updatedBoard: Board = {
        ...board,
        columns: [
          ...filteredColumns, {
            ...taskColumn,
            tasks: taskColumn.tasks.filter((task) => task.id !== deletedParameters.id),
          },
        ],
      };

      return [BoardsActions.setCurrentBoard({ board: updatedBoard })];
    }),
  ));

  getCurrentBoard$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(BoardsActions.loadCurrentBoard),
    switchMap(({ id }) => this.boardsService.getOne$(id)),
    switchMap((board) => this.columnsService.getAll$(board.id).pipe(
      switchMap((columns) => forkJoin(
        columns.map((column) => this.tasksService.getAll$(board.id, column.id).pipe(
          tap((tasks: Task[]) => set(column, 'tasks', tasks)),
        )),
      ).pipe(
        tap(() => set(board, 'columns', columns)),
      )),
      switchMap(() => [BoardsActions.setCurrentBoard({ board })]),
    )),
    catchError(() => of(BoardsActions.setCurrentBoard({ board: null }))),
  ));

  updateTask$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(BoardsActions.updateTasks),
    switchMap(({ tasks }) => forkJoin(
      [...tasks.map((task) => this.tasksService.update$(task))],
    )),
    switchMap((tasks) => {
      const { boardId } = tasks[0];
      return [BoardsActions.loadCurrentBoard({ id: boardId })];
    }),
  ));
}
