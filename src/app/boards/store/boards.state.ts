import { Board } from '../../models/board';

export interface BoardsState {
  boards: Board[];
}

export const initialBoardsState: BoardsState = {
  boards: [],
};
