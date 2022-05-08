import { createFeatureSelector, createSelector } from '@ngrx/store';

import { Board } from 'src/app/models/board';
import { StoreFeature } from '../../constants/store.enum';
import { BoardsState } from './boards.state';

const rootSelector = createFeatureSelector<BoardsState>(StoreFeature.Boards);

export const getBoards = createSelector(
  rootSelector,
  (state: BoardsState): Board[] => state.boards,
);
