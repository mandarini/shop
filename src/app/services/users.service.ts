import { Injectable } from "@angular/core";
import { User } from "../interfaces/user";
import {
  AngularFirestore,
  AngularFirestoreCollection
} from "@angular/fire/compat/firestore";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class UsersService {
  user: User;
  usersCollection: AngularFirestoreCollection<User>;
  constructor(private afs: AngularFirestore) {
    this.usersCollection = this.afs.collection<User>("users");
  }

  setActiveUser(user: User) {
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

  getAllUsers(): Observable<User[]> {
    return this.usersCollection.valueChanges();
  }

  getUserRoles(): string[] {
    const roles = ["super_admin", "admin", "plain"];
    return roles;
  }

  changeUserRole(role: string, user_id: string) {
    return this.usersCollection.doc(user_id).update({ role: role });
  }
}
