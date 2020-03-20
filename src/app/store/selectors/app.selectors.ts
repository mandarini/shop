import { createSelector, createFeatureSelector } from '@ngrx/store';
import { State } from '../reducers/index';
import { AppState } from '../reducers/app.reducer';

const selectAppFeature = createFeatureSelector<State, AppState>('app');

export const selectAppVersion = createSelector(selectAppFeature, (appState: AppState) => {
  return appState.app_version;
});

export const selectAppVersionUpdatedAt = createSelector(selectAppFeature, (appState: AppState) => {
  return appState.app_version_updated_at;
});

export const selectAppStatus = createSelector(selectAppFeature, (appState: AppState) => {
  return appState.app_status;
});
