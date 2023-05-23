import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {CrudApiMethods, PagingApiMethods} from "../crud-api-methods";
import {EMPTY, Observable, of} from "rxjs";
import {UserDto} from "../model/user.model";
import {Page, Pageable, Sort} from "../model/page";
import {LoginResponse} from "../model/login-response";
import {environment} from "../../../environments/environment";
import {UserInvitations} from "../model/user-invitations";

@Injectable({
  providedIn: 'root'
})
export class UserService implements PagingApiMethods<UserDto> {
  private static usersApi: string = "/users";

  constructor(private http: HttpClient) {
  }

  create(data: UserDto): Observable<UserDto> {
    return EMPTY;
  }

  public delete(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.api}/users/${id}`);
  }

  public getList(form: any): Observable<UserDto[]> {
    return this.http.get<UserDto[]>(`${environment.api}/users`, {params: form});;
  }

  public getOne(id: number): Observable<UserDto> {
    return this.http.get<UserDto>(`${environment.api}/users/${id}`);
  }

  public getMe(): Observable<UserDto> {
    return this.http.get<UserDto>(`${environment.api}/users/me`);
  }

  public update(id: number, data: UserDto): Observable<void> {

    return this.http.put<void>(`${environment.api}/users/${id}`, data);
  }
  public updateMe(data: UserDto, file: File): Observable<void> {

    const formData = new FormData();

    formData.append("file",file);
    formData.append("dto", new Blob([JSON.stringify(data)], {type: 'application/json'}));

    return this.http.put<void>(`${environment.api}/users/me`, formData);
  }

  public getPagingList(): Observable<Page<UserDto>> {
    return this.http.get<Page<UserDto>>(`${environment.api}/users`);
  }

  public getFriendsList(): Observable<UserDto[]> {
    return this.http.get<UserDto[]>(`${environment.api}/users/me/friends`);
  }

  public removeFromFriends(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.api}/users/me/friends/${id}`);
  }

  public addToFriends(id: number): Observable<void> {
    return this.http.post<void>(`${environment.api}/users/me/friends`, {id});
  }

  public inviteToFriends(id: number): Observable<void> {
    return this.http.post<void>(`${environment.api}/users/me/inviteFriends`, {id});
  }

  public rejectInvitationToFriends(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.api}/users/me/inviteFriends/${id}`);
  }

  public acceptInvitationToFriends(id: number): Observable<void> {
    return this.http.patch<void>(`${environment.api}/users/me/inviteFriends/${id}`,null);
  }

  public getInvitations(): Observable<UserInvitations[]> {
    return this.http.get<UserInvitations[]>(`${environment.api}/users/me/invitations`);
  }

  public updatePassword(value: any): Observable<void> {
    return this.http.patch<void>(`${environment.api}/users/me/password`, value);
  }
}
