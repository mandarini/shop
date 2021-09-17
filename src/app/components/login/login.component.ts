import { Component } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import firebase from "firebase/compat/app";
import { AngularFireMessaging } from "@angular/fire/compat/messaging";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { mergeMap } from "rxjs/operators";
import { NotificationsService } from "src/app/services/notification.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent {
  constructor(
    public auth: AngularFireAuth,
    private afMessaging: AngularFireMessaging,
    private afs: AngularFirestore,
    private notificationService: NotificationsService
  ) {}

  login() {
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }
  logout() {
    this.auth.signOut();
  }

  requestPermission() {
    this.afMessaging.requestToken.subscribe(
      (token) => {
        if (token) {
          console.log("Permission granted! Save to the server!", token);
          this.notificationService.setNotification(
            "You will now receive push notifications on this device!"
          );
          this.auth.user.subscribe((user) => {
            this.afs
              .collection("fcmTokens")
              .doc(token)
              .set({ uid: user ? user.uid : "anonymous" })
              .then((res) => {})
              .catch((error) => {
                console.log("Error setting token:", error);
              });
          });
        } else {
          return this.requestPermission();
        }
      },
      (error) => {
        console.log("Error getting token:", error);
      }
    );
  }
  deleteMyToken() {
    this.afMessaging.getToken
      .pipe(mergeMap((token) => this.afMessaging.deleteToken(token)))
      .subscribe(
        (token) => {
          this.notificationService.setNotification(
            "You will no longer receive push notifications on this device!"
          );
          console.log("Deleted!");
        },
        (error) => {
          console.log("Error deleting device token", error);
        }
      );
  }

  listen() {
    this.afMessaging.messages.subscribe(
      (message) => {
        console.log(message);
      },
      (error) => {
        console.log("Error getting messages: ", error);
      }
    );
  }
}
