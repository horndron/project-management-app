import { createAction, props } from '@ngrx/store';

import { Board } from 'src/app/models/board';

export const getBoards = createAction('[BOARDS] GET_BOARDS');

export const setBoards = createAction('[BOARDS] SET_BOARDS', props<{ boards: Board[] }>());

export const addBoard = createAction('[BOARDS] ADD_BOARD', props<{ board: Partial<Board> }>());

export const pushBoard = createAction('[BOARDS] PUSH_BOARD', props<{ board: Board }>());

export const deleteBoard = createAction('[BOARDS] DELETE_BOARD', props<{ id: string }>());
