import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreCollection,
  DocumentData
} from "@angular/fire/firestore";
import { Product } from "../interfaces/product";
import { BehaviorSubject, Observable } from "rxjs";
import { UserComment } from "../interfaces/comment";
import { AngularFireFunctions } from "@angular/fire/functions";

@Injectable({
  providedIn: "root"
})
export class ProductsService {
  productsCollection: AngularFirestoreCollection<Product>;
  productsSubject: BehaviorSubject<Product[]>;
  private callable_CreateComment: CallableFunction;
  private callable_getFullProduct: CallableFunction;

  constructor(
    private afs: AngularFirestore,
    private fns: AngularFireFunctions
  ) {
    this.productsCollection = this.afs.collection<Product>("products");
    this.productsSubject = new BehaviorSubject(null);
    this.callable_getFullProduct = this.fns.httpsCallable("getFullProduct");
  }

  getAllProductsInit(): Observable<Product[]> {
    return this.productsCollection.valueChanges();
  }
  setProducts(products: Product[]) {
    this.productsSubject.next(products);
  }
  getProducts(): Observable<Product[]> {
    return this.productsSubject.asObservable();
  }

  getProduct(product_id: string): Observable<any> {
    return this.productsCollection.doc(product_id).valueChanges();
  }

  addProduct(product: Product) {
    return this.productsCollection.add(product);
  }

  deleteProduct(product_id: string) {
    return this.productsCollection.doc(product_id).delete();
  }

  updateProduct(product_uid: string, product: Product) {
    return this.productsCollection.doc(product_uid).update(product);
  }

  createComment(product_uid: string, comment: {}) {
    return this.productsCollection
      .doc(product_uid)
      .collection("comments")
      .add(comment);
  }

  getAllComments(product_uid: string): Observable<DocumentData[]> {
    return this.productsCollection
      .doc(product_uid)
      .collection("comments")
      .valueChanges();
  }
}
