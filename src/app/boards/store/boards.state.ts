import { Nullable } from '../../models/core';
import { Board } from '../../models/board';

export interface BoardsState {
  boards: Board[];
  currentBoard: Nullable<Board>;
}

export const initialBoardsState: BoardsState = {
  boards: [],
  currentBoard: null,
};
