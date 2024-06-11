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
  public pageSize: number = 20;

  public status: Status[] = [
    new Status(1, "Ativo", "success"),
    new Status(2, "Pendente", "warning"),
    new Status(3, "Bloqueado", "danger"),
  ]

  public users: IUser[] = [];

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getUsers().subscribe({
      next: (data: any) => {
        this.users = data;
      },
      error: (error: any) => {

      }
    })
  }
}
