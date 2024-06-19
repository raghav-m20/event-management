import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EventList } from './data.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  baseUrl: string = "http://localhost:3000/local/"
  public static EventList: EventList[];
  constructor(private http: HttpClient) { }

  getData(endPoint: any): Observable<any> {
    const url = this.baseUrl + endPoint
    return this.http.get<any>(url);
  }

  postData(endPoint: any, payload: any): Observable<any> {
    const url = this.baseUrl + endPoint
    return this.http.post<any>(url, payload);
  }

  putData(endPoint: any, payload: any): Observable<any> {
    const url = this.baseUrl + endPoint
    return this.http.put<any>(url, payload);
  }

  deleteData(endPoint: any, eventId: string): Observable<any> {
    const url = this.baseUrl + endPoint + "/" + eventId;
    return this.http.get<any>(url);
  }
}
