import { User } from "./user";

export interface UserComment {
  user: User;
  text: string;
  title: string;
  date: string;
  rating: number;
}
