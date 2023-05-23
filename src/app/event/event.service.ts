import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Post} from "../core/model/post";
import {EMPTY, Observable} from "rxjs";
import {Page} from "../core/model/page";
import {environment} from "../../environments/environment";
import {Event} from "../core/model/event";

@Injectable({
  providedIn: 'root'
})
export class EventService {


  constructor(private http: HttpClient) { }

  public create(data: Event): Observable<Event> {
    return this.http.post<Event>(`${environment.api}/events`, data);
  }

  public delete(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.api}/events/${id}`);
  }

  public getList(pageNo: number, title:string, startDateTime: Date, endDateTime: Date): Observable<Page<Event>> {
    let params = new HttpParams();
    if(pageNo) {
      params = params.append("pageNo", pageNo);
    }
    if(title) {
      params = params.append("title", title);
    }
    if(startDateTime) {
      params = params.append("startDateTime", startDateTime.toISOString());
    }
    if(endDateTime) {
      params = params.append("endDateTime", endDateTime.toISOString());
    }

    return this.http.get<Page<Event>>(`${environment.api}/events`, {params: params});
  }

  public getOne(id: number): Observable<Event> {
    return this.http.get<Event>(`${environment.api}/events/${id}`, );
  }

  public update(id: number, data: Event): Observable<Event> {
    return this.http.put<Event>(`${environment.api}/events/${id}`, data);
  }

  public changeEventMemberStatus(id:number, data: { status: any }) {
    return this.http.patch<void>(`${environment.api}/events/${id}/eventMembers`, data);;
  }
}
