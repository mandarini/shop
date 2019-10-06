import { Injectable } from "@angular/core";
import { User } from "../interfaces/user";

@Injectable({
  providedIn: "root"
})
export class UsersService {
  user: User;
  constructor() {}

  setActiveUser(user: User) {
    this.user = user;
  }

  getActiveUser(): User {
    return this.user;
  }
}
