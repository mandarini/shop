import { ActionReducer, ActionReducerMap, createFeatureSelector, createSelector, MetaReducer } from '@ngrx/store';
import { environment } from '../../../environments/environment';
import { reducer, AppState } from './app.reducer';

export interface State {
  app: AppState;
}

export const reducers: ActionReducerMap<State> = {
  app: reducer
};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
