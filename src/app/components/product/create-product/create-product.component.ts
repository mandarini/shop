import { Component, Input, OnInit, Output, EventEmitter } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ProductsService } from "src/app/services/products.service";
import { Product } from "src/app/interfaces/product";

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
    private productService: ProductsService
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
            console.log(res);
            this.newProductForm.reset();
          })
          .catch(err => {
            console.log("There was an error submitting:", err);
          });
      } else {
        this.productService
          .updateProduct(this.product.uid, this.newProductForm.value)
          .then(res => {
            console.log(res);
            this.done_saving.emit("success");
            this.newProductForm.reset();
          })
          .catch(err => {
            this.done_saving.emit("error");
            console.log("There was an error submitting:", err);
          });
      }
    }
  }
}