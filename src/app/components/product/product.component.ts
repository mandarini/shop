import { Component, OnInit } from "@angular/core";
import {
  ProductsService,
  FullProduct
} from "src/app/services/products.service";
import { ActivatedRoute, Router } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { DeleteModalComponent } from "../delete-modal/delete-modal.component";

@Component({
  selector: "app-product",
  templateUrl: "./product.component.html",
  styleUrls: ["./product.component.scss"]
})
export class ProductComponent implements OnInit {
  product: FullProduct;
  loading: boolean;

  editing: boolean = false;

  deleting: boolean = false;

  constructor(
    private productService: ProductsService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog
  ) {
    this.loading = true;
    this.productService
      .getFullProduct(this.activatedRoute.snapshot.params["id"])
      .subscribe(
        (product: FullProduct) => {
          console.log(product);
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

  deleteDialog() {
    const dialogRef = this.dialog.open(DeleteModalComponent, {
      width: "250px",
      data: { product: this.product.title }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result === "OK") {
        this.deleting = true;
        this.productService
          .deleteProduct(this.product.uid)
          .then(res => {
            this.router.navigate(["/home"]);
            this.deleting = false;
          })
          .catch(err => {
            this.deleting = false;
            console.log(err);
          });
      }
    });
  }

  savingResponse(event: string) {
    if (event === "success") {
      this.editing = false;
    }
    if (event === "error") {
      console.log("error");
    }
  }
}
