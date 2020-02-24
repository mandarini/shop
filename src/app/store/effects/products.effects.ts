import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as AppActions from '../actions';
import { exhaustMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { ProductsService } from '../../services/products.service';
import { Product } from 'src/app/interfaces/product';

@Injectable()
export class ProductsEffects {
  productsListLoading$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AppActions.productListLoading),
      exhaustMap(() =>
        this.productsService.getAllProductsInit().pipe(
          map((products: Product[]) => AppActions.productListLoaded({ products })),
          catchError(err => of(AppActions.productListLoadFailure({ err })))
        )
      )
    )
  );
  constructor(private actions$: Actions, private productsService: ProductsService) {}
}
