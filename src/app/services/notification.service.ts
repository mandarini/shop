import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { MatSnackBar, MatSnackBarConfig } from "@angular/material";

export interface Notification {
  message: string;
  action: string;
}

@Injectable({
  providedIn: "root"
})
export class NotificationsService {
  notificationSubject: BehaviorSubject<Notification>;

  constructor() {
    this.notificationSubject = new BehaviorSubject<Notification>(null);
  }

  getNotification(): Observable<Notification> {
    return this.notificationSubject.asObservable();
  }

  setNotification(message: string, action?: string, error?: any) {
    console.log(error.code);
    let notif_obj: Notification = {
      message: message,
      action: action ? action : "OK"
    };
    if (error.code && error.code === "permission-denied") {
      notif_obj.message = "You don't have permission to perform this action!";
    }
    this.notificationSubject.next(notif_obj);
  }

  openToast(
    notification: Notification,
    snackBar: MatSnackBar,
    config: MatSnackBarConfig
  ) {
    snackBar.open(notification.message, notification.action, config);
  }
}
