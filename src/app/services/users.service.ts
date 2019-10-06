import { Injectable } from "@angular/core";
import { User } from "../interfaces/user";
import { AngularFirestore } from "@angular/fire/firestore";

@Injectable({
  providedIn: "root"
})
export class UsersService {
  user: User;
  constructor(private afs: AngularFirestore) {}

  setActiveUser(user: User) {
    console.log(user);
    this.user = user;
  }

  getUserRole(user_id: string) {
    return this.afs
      .collection("users")
      .doc(user_id)
      .valueChanges();
  }

  getActiveUser(): User {
    return this.user;
  }

  getAllUsers() {}
}
