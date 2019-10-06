import { Component } from "@angular/core";
import { ProductsService } from "./services/products.service";
import { Product } from "./interfaces/product";
import { AngularFireAuth } from "@angular/fire/auth";
import { UsersService } from "./services/users.service";
import { User } from "./interfaces/user";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  constructor(
    productService: ProductsService,
    public afAuth: AngularFireAuth,
    private userService: UsersService
  ) {
    productService.getAllProductsInit().subscribe((products: Product[]) => {
      console.log(products);
      productService.setProducts(products);
    });

    this.afAuth.user.subscribe(user => {
      console.log(user);
      let custom_user: User = {
        user_id: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL
      };
      this.userService.setActiveUser(custom_user);
    });
  }
}
