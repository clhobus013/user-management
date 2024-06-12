import { Component, OnInit } from '@angular/core';
import { Status } from '../models/status';
import { IUser } from '../models/user';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  faEllipsisVertical = faEllipsisVertical

  public isCollapsed = false;

  public page: number = 1;
  public pageSize: number = 10;
  public search: string = "";
  public searchStatus: number = -1;

  public status: Status[] = [
    new Status(1, "Ativo", "success"),
    new Status(2, "Pendente", "warning"),
    new Status(3, "Bloqueado", "danger"),
  ]

  public users: IUser[] = [];

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getUsers();
  }

  private getUsers() {
    this.userService.getUsers().subscribe({
      next: (data: any) => {
        this.users = this.filterBySearch(data);
      },
      error: (error: any) => {

      }
    })
  }

  public filterByStatus() {
    this.userService.getUsersWithFilters(this.searchStatus).subscribe({
      next: (data: any) => {
        this.users = this.filterBySearch(data);
      },
      error: (error: any) => {

      }
    })
  }

  public filterBySearch(users: IUser[]) {
    return users.filter((user: IUser) =>
      user.first_name.toLowerCase().includes(this.search) ||
      user.last_name.toLowerCase().includes(this.search) ||
      (user.first_name + " " +user.last_name).toLowerCase().includes(this.search) ||
      user.email.toLowerCase().includes(this.search));
  }

  public filterUsers() {

    if(this.searchStatus > 0) {
      this.filterByStatus();
    } else {
      this.getUsers();
    }

  }
}
