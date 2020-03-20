import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/product';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { State, selectProducts } from '../../store';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  products$: Observable<Product[]>;

  constructor(private store: Store<State>) {}

  ngOnInit() {
    this.products$ = this.store.pipe(select(selectProducts));
  }
}
