import { Component, OnInit } from "@angular/core";
import {
  ProductsService,
  FullProduct
} from "src/app/services/products.service";
import { ActivatedRoute, Router } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { DeleteModalComponent } from "../delete-modal/delete-modal.component";
import { NotificationsService } from "src/app/services/notification.service";

@Component({
  selector: "app-product",
  templateUrl: "./product.component.html",
  styleUrls: ["./product.component.scss"]
})
export class ProductComponent implements OnInit {
  product: FullProduct;
  loading: boolean;
  loading_comments: boolean = false;

  editing: boolean = false;

  deleting: boolean = false;

  constructor(
    private productService: ProductsService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private notificationService: NotificationsService,
    public dialog: MatDialog
  ) {
    this.loading = true;
    this.productService
      .getFullProduct(this.activatedRoute.snapshot.params["id"])
      .toPromise()
      .then((product: FullProduct) => {
        this.product = product;
        this.loading = false;
      })
      .catch(error => {
        this.loading = false;
        console.log("Getting error:", error);
      });
  }

  ngOnInit() {}

  deleteDialog() {
    const dialogRef = this.dialog.open(DeleteModalComponent, {
      width: "250px",
      data: { product: this.product.title }
    });

    dialogRef.afterClosed().subscribe(
      result => {
        if (result && result === "OK") {
          this.deleting = true;
          this.productService
            .deleteProduct(this.product.uid)
            .then(res => {
              this.notificationService.setNotification(
                "Product deleted successfully!",
                "OK"
              );
              this.router.navigate(["/home"]);
              this.deleting = false;
            })
            .catch(error => {
              this.notificationService.setNotification(
                "Could not delete product.",
                "OK",
                error
              );
              this.deleting = false;
              console.log("Product deletion error:", error);
            });
        }
      },
      error => {
        console.log("Dialog error:", error);
      }
    );
  }

  doneSaving(event: string) {
    if (event === "success") {
      this.loading_comments = true;
      this.productService
        .getFullProduct(this.activatedRoute.snapshot.params["id"])
        .toPromise()
        .then((product: FullProduct) => {
          this.product = product;
          this.loading_comments = false;
        })
        .catch(error => {
          this.loading_comments = false;
          console.log("Getting error:", error);
        });
    }
  }

  savingResponse(event: string) {
    if (event === "success") {
      this.editing = false;
      this.productService
        .getFullProduct(this.activatedRoute.snapshot.params["id"])
        .toPromise()
        .then((product: FullProduct) => {
          this.product = product;
        })
        .catch(error => {
          console.log("Getting error:", error);
        });
    }
    if (event === "error") {
      console.log("Error");
    }
  }
}
