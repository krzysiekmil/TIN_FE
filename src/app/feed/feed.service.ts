import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {BehaviorSubject, EMPTY, Observable, of, shareReplay, Subject} from "rxjs";
import {environment} from "../../environments/environment";
import {Feed} from "../core/model/feed";

@Injectable({
  providedIn: 'root'
})
export class FeedService {

  private api: string = "feeds"

  constructor(private http: HttpClient) { }


  public getList(offset?: number): Observable<Feed[]>{
    let params = new HttpParams();
    if(offset && offset >0 )
    params = params.append("offset",offset);
    return this.http.get<Feed[]>(`${environment.api}/${this.api}`, {params})
      .pipe(
        shareReplay(1000)
      )
  }
}

