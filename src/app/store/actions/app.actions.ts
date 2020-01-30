import { createAction, props } from '@ngrx/store';

export const setAppVersion = createAction('[App] Sets app version', props<{ version: string }>());
