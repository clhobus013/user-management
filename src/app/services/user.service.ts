import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _url: string = "http://localhost:3000";

  requestOptions = {                      
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }), 
  };

  constructor(private http: HttpClient) { }

  getUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(this._url + "/users", this.requestOptions);
  }

  getUserById(id: number): Observable<IUser> {
    return this.http.get<IUser>(this._url + `/users/${id}`, this.requestOptions);
  }

  postUser(user: IUser): Observable<unknown> {
    return this.http.post<unknown>(this._url + "/users", user);
  }

  putUser(user: IUser): Observable<unknown> {
    return this.http.put<unknown>(this._url + "/users/" + user.id, user);
  }

}
