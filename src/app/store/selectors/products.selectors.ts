import { createSelector, createFeatureSelector } from '@ngrx/store';
import { State } from '../reducers/index';
import { ProductsState } from '../reducers/products.reducer';

const selectProductsFeature = createFeatureSelector<State, ProductsState>('products');

export const selectProducts = createSelector(selectProductsFeature, (productsState: ProductsState) => {
  return productsState.products;
});

export const selectProductsStatus = createSelector(selectProductsFeature, (productsState: ProductsState) => {
  return productsState.status;
});

export const selectProductsError = createSelector(selectProductsFeature, (productsState: ProductsState) => {
  return productsState.error;
});
