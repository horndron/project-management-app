import { Action, createReducer, on } from '@ngrx/store';

import { Column } from 'src/app/models/column';
import { set } from 'lodash';
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
  on(BoardsActions.pushColumn, (state, { column }) => ({
    ...state,
    currentBoard: state.currentBoard ? {
      ...state.currentBoard,
      columns: [...state.currentBoard.columns, { ...column, tasks: [] }],
    } : null,
  })),
  on(BoardsActions.pushTask, (state, { task, columnId }) => {
    const columns = state.currentBoard?.columns.reduce((acc: Column[], curr: Column) => {
      const column = { ...curr };

      if (columnId === curr.id) {
        set(column, 'tasks', [...curr.tasks, task]);
      }

      acc.push(column);

      return acc;
    }, []) || [];

    return {
      ...state,
      currentBoard: state.currentBoard ? {
        ...state.currentBoard,
        columns,
      } : null,
    };
  }),
);

export function boardsReducer(state: BoardsState, action: Action) {
  return reducer(state, action);
}
