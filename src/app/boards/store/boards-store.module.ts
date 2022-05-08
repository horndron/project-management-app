import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { StoreFeature } from '../../constants/store.enum';
import { BoardsEffects } from './boards.effects';
import { boardsReducer } from './boards.reducer';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(StoreFeature.Boards, boardsReducer),
    EffectsModule.forFeature([BoardsEffects]),
  ],
})
export class BoardsStoreModule {}
