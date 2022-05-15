import { Action, createReducer, on } from '@ngrx/store';

import { initialBoardsState, BoardsState } from './boards.state';
import * as BoardsActions from './boards.actions';

const reducer = createReducer(
  initialBoardsState,
  on(BoardsActions.setBoards, (state, { boards }) => ({
    ...state,
    boards,
  })),
  on(BoardsActions.pushBoard, (state, { board }) => ({
    ...state,
    boards: [...state.boards, board],
  })),
  on(BoardsActions.setCurrentBoard, (state, { board }) => ({
    ...state,
    currentBoard: board,
  })),
);

export function boardsReducer(state: BoardsState, action: Action) {
  return reducer(state, action);
}
