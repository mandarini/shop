import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreCollection
} from "@angular/fire/firestore";
import { Product } from "../interfaces/product";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class ProductsService {
  productsCollection: AngularFirestoreCollection<Product>;
  productsSubject: BehaviorSubject<Product[]>;

  constructor(private afs: AngularFirestore) {
    this.productsCollection = this.afs.collection<Product>("products");
    this.productsSubject = new BehaviorSubject(null);
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
}
