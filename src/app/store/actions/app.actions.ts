import { createAction, props } from '@ngrx/store';

export const appVersionSet = createAction('[App] App version has been set', props<{ version: string }>());

export const appVersionUpdatedAtSet = createAction(
  '[App] App version updated at has been set',
  props<{ updated_at: Date }>()
);
