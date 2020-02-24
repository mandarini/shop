import * as AppActions from '../actions';
import { createReducer, on, Action } from '@ngrx/store';
import { Product } from '../../interfaces/product';

export interface ProductsState {
  products: Product[];
  status: string;
  error: string | Error;
}

const initialState: ProductsState = { products: [], status: '', error: null };

const productsReducer = createReducer(
  initialState,
  on(AppActions.productListLoading, state => ({ ...state, status: 'Loading' })),
  on(AppActions.productListLoaded, (state, { products }) => ({ ...state, products, status: 'Ready' })),
  on(AppActions.productListLoadFailure, (state, { err }) => ({ ...state, error: err, status: 'Failure' }))
);

export function reducer(state: ProductsState | undefined, action: Action) {
  return productsReducer(state, action);
}
