import { Component } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ProductsService } from "src/app/services/products.service";

@Component({
  selector: "app-create-product",
  templateUrl: "./create-product.component.html",
  styleUrls: ["./create-product.component.scss"]
})
export class CreateProductComponent {
  newProductForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private productService: ProductsService
  ) {
    this.newProductForm = this.fb.group({
      name: ["", [Validators.required]],
      title: ["", []],
      decsription: ["", [Validators.required]],
      price: [null, []],
      img: ["", []]
    });
  }

  onSubmit() {
    if (this.newProductForm.valid) {
      this.productService
        .addProduct(this.newProductForm.value)
        .then(res => {
          console.log(res);
          this.newProductForm.reset();
        })
        .catch(err => {
          console.log("There was an error submitting:", err);
        });
    }
  }
}
