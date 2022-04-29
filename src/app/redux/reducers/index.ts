import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { UserState } from 'src/app/auth/models/user.model';
import { environment } from '../../../environments/environment';
import { userReducer } from '../../auth/store/user.reducer';

export interface State {
  user: UserState,
}

export const reducers: ActionReducerMap<State> = {
  user: userReducer,
};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
