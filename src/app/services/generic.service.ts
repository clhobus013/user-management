import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Generic } from '../models/Generic';

@Injectable({
  providedIn: 'root'
})
export class GenericService {

  private _url: string = "http://localhost:3000";

  requestOptions = {                      
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }), 
  };

  constructor(private http: HttpClient) { }

  getLanguages(): Observable<Generic[]> {
    return this.http.get<Generic[]>(this._url + "/languages", this.requestOptions);
  }

  getContacts(): Observable<Generic[]> {
    return this.http.get<Generic[]>(this._url + "/contacts", this.requestOptions);
  }

  getAccessProfiles(): Observable<Generic[]> {
    return this.http.get<Generic[]>(this._url + "/profiles", this.requestOptions);
  }
}
