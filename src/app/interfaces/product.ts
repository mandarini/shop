export interface Product {
  uid?: string;
  name: string;
  title: string;
  decsription: string;
  price: number;
  rating?: number;
  img?: string;
  comments: Comment[];
}
