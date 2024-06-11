import { Component } from '@angular/core';
import { Status } from '../models/status';
import { IUser } from '../models/user';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent {

  faEllipsisVertical = faEllipsisVertical

  public isCollapsed = false;

  public page: number = 1;
  public pageSize: number = 20;

  public status: Status[] = [
    new Status(1, "Ativo", "success"),
    new Status(2, "Pendente", "warning"),
    new Status(3, "Bloqueado", "danger"),
  ]

  public users: IUser[] = [
    {
      "id": 1,
      "first_name": "Diego",
      "last_name": "Souza",
      "phone": "+55 (99) 9999-9999",
      "email": "diego@email.com",
      "access_profile": [this.status[0], this.status[1]],
      "language": "Português BR",
      "preferred_contact": "Todos",
      "status": this.status[0],
      "creation_date": "10/10/2020",
      "last_access_date": "10/10/2020",
      "last_access_time": "10:00"
    }
  ]

  constructor() { }

}
