import { Component } from "@angular/core";
import { MatSnackBarConfig, MatSnackBar } from "@angular/material";
import {
  NotificationsService,
  Notification
} from "src/app/services/notification.service";

@Component({
  selector: "app-notification",
  templateUrl: "./notification.component.html",
  styleUrls: ["./notification.component.scss"]
})
export class NotificationComponent {
  config: MatSnackBarConfig;

  constructor(
    private snackBar: MatSnackBar,
    private notificationService: NotificationsService
  ) {
    this.config = new MatSnackBarConfig();
    this.config.duration = 2000;
    this.config.panelClass = ["snackbar"];
    this.config.verticalPosition = "bottom";
    this.config.horizontalPosition = "center";

    this.notificationService.getNotification().subscribe(
      (notification: Notification) => {
        if (notification) {
          this.notificationService.openToast(
            notification,
            this.snackBar,
            this.config
          );
        }
      },
      error => {
        console.log(error);
      }
    );
  }
}
