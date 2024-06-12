import { Component, OnInit } from '@angular/core';
import { Status } from '../models/status';
import { IUser } from '../models/user';
import { faEllipsisVertical, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { UserService } from '../services/user.service';
import { StatusService } from '../services/status.service';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  faEllipsisVertical = faEllipsisVertical
  faMagnifyingGlass = faMagnifyingGlass;

  public isCollapsed = false;

  public search: string = "";
  public page: number = 1;
  public pageSize: number = 10;
  public searchStatus: number = -1;

  public status: Status[] = []
  public users: IUser[] = [];

  constructor(
    private userService: UserService,
    private statusService: StatusService
  ) { }

  ngOnInit() {
    this.getStatus();
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

  private getStatus() {
    this.statusService.getStatus().subscribe({
      next: (data: any) => {
        this.status = data;
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
      user.first_name.toLowerCase().includes(this.search.toLowerCase()) ||
      user.last_name.toLowerCase().includes(this.search.toLowerCase()) ||
      (user.first_name + " " + user.last_name).toLowerCase().includes(this.search.toLowerCase()) ||
      user.email.toLowerCase().includes(this.search.toLowerCase()));
  }

  public filterUsers() {

    if (this.searchStatus > 0) {
      this.filterByStatus();
    } else {
      this.getUsers();
    }

  }
}
