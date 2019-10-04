import { Component } from "@angular/core";
import { ProductsService } from "./services/products.service";
import { Product } from "./interfaces/product";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  constructor(productService: ProductsService) {
    productService.getAllProductsInit().subscribe((products: Product[]) => {
      console.log(products);
      productService.setProducts(products);
    });
  }
}
