import { createAction, props } from '@ngrx/store';

import { Board } from '../../models/board';

const actionSource = '[BOARDS]';

export const getBoards = createAction(`${actionSource} GET_BOARDS`);

export const setBoards = createAction(`${actionSource} SET_BOARDS`, props<{ boards: Board[] }>());

export const addBoard = createAction(`${actionSource} ADD_BOARD`, props<{ board: Partial<Board> }>());

export const pushBoard = createAction(`${actionSource} PUSH_BOARD`, props<{ board: Board }>());

export const deleteBoard = createAction(`${actionSource} DELETE_BOARD`, props<{ id: string }>());
