import * as AppActions from '../app.actions';
import { createReducer, on, Action } from '@ngrx/store';

export interface State {
  app_version: string;
}

const initialState: State = { app_version: null };

const appReducer = createReducer(
  initialState,
  on(AppActions.setAppVersion, (state, { version }) => ({ ...state, app_version: version }))
);

export function reducer(state: State | undefined, action: Action) {
  return appReducer(state, action);
}
