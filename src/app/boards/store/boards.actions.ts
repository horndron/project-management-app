import { createAction, props } from '@ngrx/store';
import { TaskUpdate } from 'src/app/models/task';

import { Column } from 'src/app/models/column';
import { Nullable } from 'src/app/models/core';
import { Board } from '../../models/board';

const actionSource = '[BOARDS]';

export const getBoards = createAction(`${actionSource} GET_BOARDS`);

export const loadCurrentBoard = createAction(`${actionSource} LOAD_CURRENT_BOARD`, props<{ id: string }>());

export const setCurrentBoard = createAction(`${actionSource} SET_CURRENT_BOARD`, props<{ board: Nullable<Board> }>());

export const setBoards = createAction(`${actionSource} SET_BOARDS`, props<{ boards: Board[] }>());

export const addBoard = createAction(`${actionSource} ADD_BOARD`, props<{ board: Partial<Board> }>());

export const addColumn = createAction(`${actionSource} ADD_COLUMN`, props<{ column: Column }>());

export const pushBoard = createAction(`${actionSource} PUSH_BOARD`, props<{ board: Board }>());

export const pushColumn = createAction(`${actionSource} PUSH_C`, props<{ boardId: string, column: Column }>());

export const pushTask = createAction(`${actionSource} PUSH_BOARD`, props<{ boardId: string, columnId: string, task: Task }>());

export const deleteBoard = createAction(`${actionSource} DELETE_BOARD`, props<{ id: string }>());

export const updateTasks = createAction(`${actionSource} UPDATE_TASK`, props<{ tasks: TaskUpdate[] }>());

export const deleteColumn = createAction(`${actionSource} DELETE_COLUMN`, props<{ id: string, boardId: string }>());

export const deleteTask = createAction(`${actionSource} DELETE_TASK`, props<{ id: string, boardId: string, columnId: string }>());
