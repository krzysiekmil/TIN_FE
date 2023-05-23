import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, shareReplay} from "rxjs";
import {environment} from "../../environments/environment";
import {CrudApiMethods} from "../core/crud-api-methods";

export enum AnimalsType {
  DOG = 'DOG',
  CAT = 'CAT'
}

export interface AnimalsDto {
  description: string;
  id: number;
  name: string;
  type: AnimalsType;
  dateOfBirth: Date;
  image: string;
  owner?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AnimalsService {
  readonly API = "/animals"

  constructor(private http:HttpClient) {
  }


  create(file: File, data: AnimalsDto): Observable<AnimalsDto> {

    const formData = new FormData();

    formData.append("file",file);
    formData.append("dto", new Blob([JSON.stringify(data)], {type: 'application/json'}));

    return this.http.post<AnimalsDto>(environment.api + this.API, formData);

  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(environment.api + this.API + "/"+ id);
  }

  getList(): Observable<AnimalsDto[]> {
    return this.http.get<AnimalsDto[]>(environment.api + this.API)
      .pipe(shareReplay())
  }

  getUserList(): Observable<AnimalsDto[]> {
    return this.http.get<AnimalsDto[]>(`${environment.api + this.API}/me`)
      .pipe(shareReplay())
  }

  getOne(id: number): Observable<AnimalsDto> {
    return this.http.get<AnimalsDto>(`${environment.api + this.API}/${id}`);
  }

  public update(id: number, file: File, data: AnimalsDto): Observable<AnimalsDto> {

    const formData = new FormData();


    formData.append("file",file);
    formData.append("dto", new Blob([JSON.stringify(data)], {type: 'application/json'}));

    return this.http.put<AnimalsDto>(`${environment.api + this.API}/${id}`, formData);
  }
}
