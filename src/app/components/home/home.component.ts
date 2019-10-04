import { Component, OnInit } from "@angular/core";
import { Product } from "src/app/interfaces/product";
import { Observable } from "rxjs";
import { ProductsService } from "src/app/services/products.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  products: Observable<Product[]>;

  constructor(private productService: ProductsService) {
    this.products = this.productService.getProducts();
  }

  ngOnInit() {}
}
