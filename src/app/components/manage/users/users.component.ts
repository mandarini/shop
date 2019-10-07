import { Component, OnInit } from "@angular/core";
import { UsersService } from "src/app/services/users.service";
import { Observable } from "rxjs";
import { User } from "src/app/interfaces/user";
import { MatRadioChange } from "@angular/material/radio";
import { NotificationsService } from "src/app/services/notification.service";

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.scss"]
})
export class UsersComponent {
  users: Observable<User[]> = this.userService.getAllUsers();
  roles: string[] = this.userService.getUserRoles();

  constructor(
    private userService: UsersService,
    private notificationService: NotificationsService
  ) {}

  changed(event: MatRadioChange, user_id: string) {
    console.log(event, user_id);
    this.userService
      .changeUserRole(event.value, user_id)
      .then(res => {
        this.notificationService.setNotification(
          `User role changed to: ${event.value}`,
          "OK"
        );
      })
      .catch(error => {
        this.notificationService.setNotification(
          `There was an error changing the role.`,
          "OK",
          error
        );
        console.log("Error changing role:", error);
      });
  }
}
