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

import { map, switchMap, tap,
} from 'rxjs/operators';
import { isEmpty, set } from 'lodash';

import { Column } from 'src/app/models/column';
import { TasksService } from '../services/tasks/tasks.service';
import { ColumnsService } from '../services/columns/columns.service';
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

  addTask$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(BoardsActions.addTask),
    switchMap(({ task }) => ((task.boardId && task.columnId) ? this.tasksService.create$({
      title: task?.title,
      done: task?.done || false,
      order: task?.order || 0,
      description: task?.description,
      userId: task?.userId,
    }, task!.boardId, task?.columnId) : of(null))),
    switchMap((createdTask: Nullable<Task>) => {
      if (!createdTask) {
        this.notificationService.error(
          this.translateService.instant('MESSAGES.ERROR_CREATE'),
        );
        return [];
      }

      return [BoardsActions.pushTask({ columnId: createdTask.columnId, task: createdTask })];
    }),
  ));

  addColumn$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(BoardsActions.addColumn),
    switchMap(({ column, boardId }) => this.columnsService.create$(column, boardId)),
    switchMap((createdColumn: Nullable<Column>) => {
      if (!createdColumn) {
        this.notificationService.error(
          this.translateService.instant('MESSAGES.ERROR_CREATE'),
        );
        return [];
      }

      return [BoardsActions.pushColumn({ column: createdColumn })];
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
        columns:
            board?.columns?.filter((column) => column.id !== deletedId) || [],
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
          ...filteredColumns,
          {
            ...taskColumn,
            tasks: taskColumn.tasks.filter(
              (task) => task.id !== deletedParameters.id,
            ),
          },
        ],
      };

      return [BoardsActions.setCurrentBoard({ board: updatedBoard })];
    }),
  ));

  getCurrentBoard$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(BoardsActions.loadCurrentBoard),
    switchMap(({ id }) => this.boardsService.getOne$(id).pipe(
      map((board) => ({
        ...board,
        columns: board.columns.map((column) => ({
          ...column,
          tasks: column.tasks.map((task) => ({ ...task, columnId: column.id, boardId: id })),
        })),
      })),
    )),
    switchMap((board) => [BoardsActions.setCurrentBoard({ board })]),
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
            column = {
              ...column,
              title: changedColumn.title,
            };
          }

          return column;
        });

        const updatedBoard = {
          ...currentBoard,
          columns: updatedColumns,
        };

        return [BoardsActions.setCurrentBoard({ board: updatedBoard })];
      }

      return [];
    }),
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
