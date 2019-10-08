import { UserComment } from './comment';

export interface Product {
  uid?: string;
  name: string;
  title: string;
  description: string;
  price: number;
  rating?: number;
  img?: string;
  comments: UserComment[];
}
