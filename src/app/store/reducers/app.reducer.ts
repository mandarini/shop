import * as AppActions from '../actions';
import { createReducer, on, Action } from '@ngrx/store';

export interface AppState {
  app_version: string;
}

const initialState: AppState = { app_version: null };

const appReducer = createReducer(
  initialState,
  on(AppActions.setAppVersion, (state, { version }) => ({ ...state, app_version: version }))
);

export function reducer(state: AppState | undefined, action: Action) {
  return appReducer(state, action);
}
