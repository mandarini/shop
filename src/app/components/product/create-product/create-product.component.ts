import { Component, Input, OnInit, Output, EventEmitter } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ProductsService } from "src/app/services/products.service";
import { Product } from "src/app/interfaces/product";
import { NotificationsService } from "src/app/services/notification.service";

@Component({
  selector: "app-create-product",
  templateUrl: "./create-product.component.html",
  styleUrls: ["./create-product.component.scss"]
})
export class CreateProductComponent implements OnInit {
  newProductForm: FormGroup;

  @Input() edit_mode: boolean;
  @Input() product: Product;

  @Output() done_saving: EventEmitter<string> = new EventEmitter<string>(null);

  constructor(
    private fb: FormBuilder,
    private productService: ProductsService,
    private notificationService: NotificationsService
  ) {
    this.newProductForm = this.fb.group({
      name: ["", [Validators.required]],
      title: ["", []],
      description: ["", [Validators.required]],
      price: [null, []],
      img: ["", []]
    });
  }

  ngOnInit() {
    if (this.edit_mode && this.product) {
      this.newProductForm.setValue({
        name: this.product.name,
        title: this.product.title,
        description: this.product.description,
        price: this.product.price,
        img: this.product.img
      });
    }
  }

  onSubmit() {
    if (this.newProductForm.valid) {
      if (!this.edit_mode) {
        this.productService
          .addProduct(this.newProductForm.value)
          .then(res => {
            this.notificationService.setNotification(
              "Product created successfully!"
            );
            this.newProductForm.reset();
          })
          .catch(error => {
            console.log("Error creating:", error);
            this.notificationService.setNotification(
              "Error creating product!",
              "OK",
              error
            );
          });
      } else {
        this.productService
          .updateProduct(this.product.uid, this.newProductForm.value)
          .then(res => {
            this.done_saving.emit("success");
            this.notificationService.setNotification("Product info updated!");
            this.newProductForm.reset();
          })
          .catch(error => {
            this.notificationService.setNotification(
              "Error updating product info!",
              "OK",
              error
            );
            this.done_saving.emit("error");
            console.log("Error submitting:", error);
          });
      }
    }
  }
}
