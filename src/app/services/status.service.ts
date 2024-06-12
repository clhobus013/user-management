import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Status } from '../models/status';

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  private _url: string = "http://localhost:3000";

  requestOptions = {                      
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }), 
  };

  constructor(private http: HttpClient) { }

  getStatus(): Observable<Status[]> {
    return this.http.get<Status[]>(this._url + "/status", this.requestOptions);
  }
}
