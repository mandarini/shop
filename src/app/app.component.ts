import { Component } from '@angular/core';
import { ProductsService } from './services/products.service';
import { Product } from './interfaces/product';
import { AngularFireAuth } from '@angular/fire/auth';
import { UsersService } from './services/users.service';
import { User } from './interfaces/user';
import { Store, select } from '@ngrx/store';
import * as AppStore from './store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  user: User;
  appVersion$: Observable<string>;
  appVersionUpdatedAt$: Observable<Date>;
  constructor(
    productService: ProductsService,
    public afAuth: AngularFireAuth,
    private userService: UsersService,
    appStore: Store<AppStore.State>
  ) {
    appStore.dispatch(AppStore.appVersionSet({ version: '0.1' }));
    this.appVersion$ = appStore.pipe(select(AppStore.selectAppVersion));
    this.appVersionUpdatedAt$ = appStore.pipe(select(AppStore.selectAppVersionUpdatedAt));
    productService.getAllProductsInit().subscribe(
      (products: Product[]) => {
        console.log(products);
        productService.setProducts(products);
      },
      error => {
        console.log('Error loading products: ', error);
      }
    );

    this.afAuth.user.subscribe(user => {
      if (user) {
        this.userService.getUserRole(user.uid).subscribe(
          (user_full: User) => {
            if (user_full) {
              let custom_user: User = {
                user_id: user.uid,
                email: user.email,
                displayName: user.displayName,
                photoURL: user.photoURL,
                role: user_full.role ? user_full.role : 'plain'
              };
              this.user = custom_user;
              this.userService.setActiveUser(custom_user);
            } else {
              let custom_user: User = {
                user_id: user.uid,
                email: user.email,
                displayName: user.displayName,
                photoURL: user.photoURL
              };
              this.user = custom_user;
              this.userService.setActiveUser(custom_user);
            }
          },
          error => {
            console.log('Error getting user: ', error);
          }
        );
      }
    });
  }
}
