import { ActionReducer, ActionReducerMap, createFeatureSelector, createSelector, MetaReducer } from '@ngrx/store';
import { environment } from '../../environments/environment';
import { reducer, State } from './app.reducer';

export interface AppState {
  app: State;
}

export const reducers: ActionReducerMap<AppState> = {
  app: reducer
};

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
