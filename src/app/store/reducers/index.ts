import { ActionReducer, ActionReducerMap, createFeatureSelector, createSelector, MetaReducer } from '@ngrx/store';
import { environment } from '../../../environments/environment';
import { reducer as AppReducer, AppState } from './app.reducer';
import { reducer as ProductsReducer, ProductsState } from './products.reducer';

export interface State {
  app: AppState;
  products: ProductsState;
}

export const reducers: ActionReducerMap<State> = {
  app: AppReducer,
  products: ProductsReducer
};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
