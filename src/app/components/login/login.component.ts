import { Component } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { auth } from "firebase/app";
import { AngularFireMessaging } from "@angular/fire/messaging";
import { AngularFirestore } from "@angular/fire/firestore";
import { mergeMap } from "rxjs/operators";
import { NotificationsService } from "src/app/services/notification.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent {
  constructor(
    public afAuth: AngularFireAuth,
    private afMessaging: AngularFireMessaging,
    private afs: AngularFirestore,
    private notificationService: NotificationsService
  ) {}
  login() {
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }
  logout() {
    this.afAuth.auth.signOut();
  }

  requestPermission() {
    this.afMessaging.requestToken.subscribe(
      token => {
        // this.db.collection('fcmTokens')
        if (token) {
          console.log("Permission granted! Save to the server!", token);
          // Save the Device Token to the datastore.
          this.notificationService.setNotification(
            "You will now receive push notifications on this device!"
          );
          this.afAuth.user.subscribe(user => {
            this.afs
              .collection("fcmTokens")
              .doc(token)
              .set({ uid: user.uid });
          });
        } else {
          // Need to request permissions to show notifications.
          return this.requestPermission();
        }
      },
      error => {
        console.error(error);
      }
    );
  }
  deleteMyToken() {
    this.afMessaging.getToken
      .pipe(mergeMap(token => this.afMessaging.deleteToken(token)))
      .subscribe(token => {
        this.notificationService.setNotification(
          "You will no longer receive push notifications on this device!"
        );
        console.log("Deleted!");
      });
  }

  listen() {
    this.afMessaging.messages.subscribe(message => {
      console.log(message);
    });
  }
}
