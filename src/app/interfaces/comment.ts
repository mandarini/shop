import { User } from "./user";

export interface UserComment {
  uid?: string;
  user: User;
  text: string;
  title: string;
  date: string;
  rating: number;
}
