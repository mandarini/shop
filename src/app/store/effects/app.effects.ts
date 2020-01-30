import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as AppActions from '../actions';
import { exhaustMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class AppEffects {
  appVersionSet$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AppActions.appVersionSet),
      exhaustMap(action => of(AppActions.appVersionUpdatedAtSet({ updated_at: new Date() })))
    )
  );
  constructor(private actions$: Actions) {}
}
