import { createAction, props } from '@ngrx/store';
import { Nullable } from 'src/app/models/core';

import { Board } from '../../models/board';

const actionSource = '[BOARDS]';

export const getBoards = createAction(`${actionSource} GET_BOARDS`);

export const loadCurrentBoard = createAction(`${actionSource} LOAD_CURRENT_BOARD`, props<{ id: string }>());

export const setCurrentBoard = createAction(`${actionSource} SET_CURRENT_BOARD`, props<{ board: Nullable<Board> }>());

export const setBoards = createAction(`${actionSource} SET_BOARDS`, props<{ boards: Board[] }>());

export const addBoard = createAction(`${actionSource} ADD_BOARD`, props<{ board: Partial<Board> }>());

export const pushBoard = createAction(`${actionSource} PUSH_BOARD`, props<{ board: Board }>());

export const deleteBoard = createAction(`${actionSource} DELETE_BOARD`, props<{ id: string }>());

export const changeBoardTitle = createAction(`${actionSource} CHANGE_BOARD_TITLE`, props<{ id: string, board: Partial<Board> }>());
