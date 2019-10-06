import { Component, OnInit } from "@angular/core";
import { UsersService } from "src/app/services/users.service";
import { Observable } from "rxjs";
import { User } from "src/app/interfaces/user";
import { MatRadioChange } from "@angular/material/radio";

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.scss"]
})
export class UsersComponent implements OnInit {
  users: Observable<User[]> = this.userService.getAllUsers();
  roles: string[] = this.userService.getUserRoles();

  constructor(private userService: UsersService) {}

  ngOnInit() {}

  changed(event: MatRadioChange, user_id: string) {
    console.log(event, user_id);
    this.userService
      .changeUserRole(event.value, user_id)
      .then(res => {
        console.log(res);
      })
      .catch(error => {
        console.log(error);
      });
  }
}
