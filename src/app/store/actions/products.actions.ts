import { createAction, props } from '@ngrx/store';
import { Product } from '../../interfaces/product';

export const productListLoading = createAction('[Home Component] The list of products is loading');
export const productListLoaded = createAction(
  '[Firebase Product Collection] Our list of products was loaded from our Firebase products collection',
  props<{ products: Product[] }>()
);
export const productListLoadFailure = createAction(
  '[Firebase Product Collection] Failed loading product list from our Firebase products collection',
  props<{ err: string | Error }>()
);
