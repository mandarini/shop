import { Component, OnInit } from "@angular/core";
import { ProductsService } from "src/app/services/products.service";
import { ActivatedRoute } from "@angular/router";
import { Product } from "src/app/interfaces/product";
import { Observable } from "rxjs";

@Component({
  selector: "app-product",
  templateUrl: "./product.component.html",
  styleUrls: ["./product.component.scss"]
})
export class ProductComponent implements OnInit {
  product: Product;
  loading: boolean;

  editing: boolean = false;

  constructor(
    private productService: ProductsService,
    private activatedRoute: ActivatedRoute
  ) {
    this.loading = true;
    this.productService
      .getProduct(this.activatedRoute.snapshot.params["id"])
      .subscribe(
        (product: Product) => {
          this.product = product;
          this.loading = false;
        },
        error => {
          this.loading = false;
          console.log(error);
        }
      );
  }

  ngOnInit() {}

  savingResponse(event: string) {
    if (event === "success") {
      this.editing = false;
    }
    if (event === "error") {
      console.log("error");
    }
  }
}
