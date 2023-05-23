import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {CrudApiMethods} from "../core/crud-api-methods";
import {Post} from "../core/model/post";
import {EMPTY, Observable, of} from "rxjs";
import {environment} from "../../environments/environment";
import {Page} from "../core/model/page";
import {UserDto} from "../core/model/user.model";
import {Comment} from "../core/model/comment";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  create(file: File, data: Post): Observable<Post> {

    const formData = new FormData();

    formData.append("file",file);
    formData.append("dto", new Blob([JSON.stringify(data)], {type: 'application/json'}));

    return this.http.post<Post>(`${environment.api}/posts`, formData);
  }

  delete(id: number): Observable<void> {
    return EMPTY;
  }

  addComment(id: number, data: object): Observable<Comment> {
    return this.http.post<Comment>(`${environment.api}/posts/${id}/comments`, data);
  }

  getList(authorId: string): Observable<Page<Post>> {
    let params = new HttpParams();
    if(authorId) {
      params = params.append("authorId", authorId);
    }
    return this.http.get<Page<Post>>(`${environment.api}/posts`, {params: params});
  }

  getOne(id: number): Observable<Post> {
    return this.http.get<Post>(`${environment.api}/posts/${id}`);
  }

  update(id: number, file: File, data: Post): Observable<Post> {

    const formData = new FormData();

    formData.append("file",file);
    formData.append("dto", new Blob([JSON.stringify(data)], {type: 'application/json'}));

    return this.http.put<Post>(`${environment.api}/posts/${id}`, formData);
  }



}
