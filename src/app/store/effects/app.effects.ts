import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as AppActions from '../actions';
import { exhaustMap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as routerStore from '@ngrx/router-store';

@Injectable()
export class AppEffects {
  appVersionSet$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AppActions.appVersionSet),
      exhaustMap(action => of(AppActions.appVersionUpdatedAtSet({ updated_at: new Date() })))
    )
  );
  routerNavigationRequested$ = createEffect(() =>
    this.actions$.pipe(
      ofType(routerStore.ROUTER_REQUEST),
      exhaustMap(action => of(AppActions.appLoading()))
    )
  );

  routerNavigated$ = createEffect(() =>
    this.actions$.pipe(
      ofType(routerStore.ROUTER_NAVIGATED),
      exhaustMap(action => of(AppActions.appReady()))
    )
  );

  constructor(private actions$: Actions) {}
}
