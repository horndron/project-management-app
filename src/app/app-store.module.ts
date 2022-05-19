import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { UserStoreModule } from './user/store/user-store.module';

import { BoardsStoreModule } from './boards/store/boards-store.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    UserStoreModule,
    BoardsStoreModule,
  ],
})
export class AppStoreModule { }
