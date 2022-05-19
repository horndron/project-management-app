import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreFeature } from '../../constants/store.enum';
import { AuthEffects } from './effects/auth.effects';
import { UserEffects } from './effects/user.effects';
import { userReducer } from './user.reducer';

@NgModule({
  imports: [
    StoreModule.forFeature(StoreFeature.User, userReducer),
    EffectsModule.forFeature([AuthEffects, UserEffects]),
  ],
})
export class UserStoreModule {}
