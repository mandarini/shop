import * as AppActions from '../actions';
import { createReducer, on, Action } from '@ngrx/store';

export interface AppState {
  app_version: string;
  app_version_updated_at: Date | null;
}

const initialState: AppState = { app_version: null, app_version_updated_at: null };

const appReducer = createReducer(
  initialState,
  on(AppActions.appVersionSet, (state, { version }) => ({ ...state, app_version: version })),
  on(AppActions.appVersionUpdatedAtSet, (state, { updated_at }) => ({ ...state, app_version_updated_at: updated_at }))
);

export function reducer(state: AppState | undefined, action: Action) {
  return appReducer(state, action);
}
