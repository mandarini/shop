import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { State, selectProductsStatus, productListLoading } from '../store';
import { tap, filter, take, map, switchMap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HomeGuard implements CanActivate {
  constructor(private store: Store<State>) {}

  canActivate(): Observable<boolean> {
    return this.checkStoreForProducts().pipe(
      switchMap(() => of(true)),
      catchError(() => of(false))
    );
  }

  private checkStoreForProducts(): Observable<boolean> {
    return this.store.pipe(
      select(selectProductsStatus),
      tap((status: string) => {
        if (status !== 'Ready') {
          this.store.dispatch(productListLoading());
        }
      }),
      map((status: string) => status === 'Ready'),
      filter((ready: boolean) => ready),
      take(1)
    );
  }
}
