import { Component, OnInit, Input } from "@angular/core";
import { Product } from "src/app/interfaces/product";

@Component({
  selector: "app-comments",
  templateUrl: "./comments.component.html",
  styleUrls: ["./comments.component.scss"]
})
export class CommentsComponent implements OnInit {
  @Input() product: Product;
  constructor() {}

  ngOnInit() {}
}
