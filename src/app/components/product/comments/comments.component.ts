import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";
import { Product } from "src/app/interfaces/product";
import { FullProduct } from "src/app/services/products.service";

@Component({
  selector: "app-comments",
  templateUrl: "./comments.component.html",
  styleUrls: ["./comments.component.scss"]
})
export class CommentsComponent implements OnInit {
  @Input() product: FullProduct;
  @Output() done_saving: EventEmitter<string> = new EventEmitter<string>(null);
  constructor() {}

  ngOnInit() {}


}
