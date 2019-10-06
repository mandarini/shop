import { Component, OnInit, Input } from "@angular/core";
import { Product } from "src/app/interfaces/product";
import { FullProduct } from "src/app/services/products.service";

@Component({
  selector: "app-comments",
  templateUrl: "./comments.component.html",
  styleUrls: ["./comments.component.scss"]
})
export class CommentsComponent implements OnInit {
  @Input() product: FullProduct;
  constructor() {}

  ngOnInit() {}
}
