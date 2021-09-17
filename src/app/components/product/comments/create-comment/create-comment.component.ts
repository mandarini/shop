import { Component, Input, Output, EventEmitter } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ProductsService } from "src/app/services/products.service";
import { Product } from "src/app/interfaces/product";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { NotificationsService } from "src/app/services/notification.service";

@Component({
  selector: "app-create-comment",
  templateUrl: "./create-comment.component.html",
  styleUrls: ["../../create-product/create-product.component.scss"],
})
export class CreateCommentComponent {
  @Input() product: Product;
  @Output() done_saving: EventEmitter<string> = new EventEmitter<string>(null);

  newCommentForm: FormGroup;
  currentUser: string;

  constructor(
    private fb: FormBuilder,
    private productService: ProductsService,
    public afAuth: AngularFireAuth,
    private notificationService: NotificationsService
  ) {
    this.newCommentForm = this.fb.group({
      text: ["", [Validators.required]],
      title: ["", []],
      rating: [null, Validators.required],
    });

    this.afAuth.currentUser.then((currentUser) => {
      this.currentUser = currentUser
        ? currentUser.displayName
          ? currentUser.displayName
          : "anonymous"
        : "anonymous";
    });
  }

  async onSubmit() {
    if (this.newCommentForm.valid) {
      let comment = {
        ...this.newCommentForm.value,
        user_email: (await this.afAuth.currentUser)
          ? (await this.afAuth.currentUser).email
            ? (await this.afAuth.currentUser).email
            : "anonymous"
          : "anonymous",
        date: Date.now(),
      };
      this.productService
        .createComment(this.product.uid, comment)
        .then((res) => {
          console.log(res);
          this.notificationService.setNotification("Comment posted!", "OK");
          this.done_saving.emit("success");
          this.newCommentForm.reset();
        })
        .catch((error) => {
          this.done_saving.emit("error");
          this.notificationService.setNotification(
            "Error posting comment!",
            "OK",
            error
          );
          console.log("There was an error submitting:", error);
        });
    }
  }
}
