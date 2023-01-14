import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, shareReplay} from "rxjs";
import {environment} from "../../environments/environment";
import {CrudApiMethods} from "../core/crud-api-methods";
import * as http from "http";
import {map, tap} from "rxjs/operators";

export enum AnimalsType {
  DOG = 'DOG',
  CAT = 'CAT'
}

export interface AnimalsDto {
  description: string,
  id: number
  name: string
  type: AnimalsType
  dateOfBirth: Date
  image?: string
  owner?: boolean
}

@Injectable({
  providedIn: 'root'
})
export class AnimalsService implements CrudApiMethods<AnimalsDto>{
  readonly API = "/animals"

  constructor(private http:HttpClient) {
  }

  public dogImages = [
    'https://images.pexels.com/photos/1851164/pexels-photo-1851164.jpeg',
    'https://images.pexels.com/photos/58997/pexels-photo-58997.jpeg',
    'https://images.pexels.com/photos/220938/pexels-photo-220938.jpeg',
    'https://images.pexels.com/photos/2253275/pexels-photo-2253275.jpeg',
    'https://material.angular.io/assets/img/examples/shiba2.jpg',
    'https://images.pexels.com/photos/2023384/pexels-photo-2023384.jpeg',
    'https://images.pexels.com/photos/825947/pexels-photo-825947.jpeg',
    'https://images.pexels.com/photos/1629781/pexels-photo-1629781.jpeg',
    'https://images.pexels.com/photos/825949/pexels-photo-825949.jpeg',
    'https://images.pexels.com/photos/164186/pexels-photo-164186.jpeg'
  ]
  public catImages = []

  public getPictureDog(): string {
    return this.dogImages[this.randomIntFromInterval(0, new Date().getTime()) % this.dogImages.length]
  }

  private randomIntFromInterval(min:number, max:number): number { // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  create(data: AnimalsDto): Observable<AnimalsDto> {
    return this.http.post<AnimalsDto>(environment.api + this.API, data)
      .pipe(
        tap(animal => animal.image = this.getPictureDog())
      )
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(environment.api + this.API + "/"+ id);
  }

  getList(): Observable<AnimalsDto[]> {
    return this.http.get<AnimalsDto[]>(environment.api + this.API)
      .pipe(
        tap(list => list.forEach(animal => animal.image = this.getPictureDog())),
        shareReplay()
      )
  }

  getUserList(): Observable<AnimalsDto[]> {
    return this.http.get<AnimalsDto[]>(`${environment.api + this.API}/me`)
      .pipe(
        tap(list => list.forEach(animal => animal.image = this.getPictureDog())),
        shareReplay()
      )
  }

  getOne(id: number): Observable<AnimalsDto> {
    return this.http.get<AnimalsDto>(`${environment.api + this.API}/${id}`)
      .pipe(
        tap(animal => {
          if(animal)
            animal.image= this.getPictureDog()
        })
      )
  }

  update(data: AnimalsDto): Observable<AnimalsDto> {
    return this.http.put<AnimalsDto>(environment.api + this.API, data)
      .pipe(
        tap(animal => animal.image = this.getPictureDog())
      )
  }
}
