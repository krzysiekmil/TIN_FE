import {Observable} from "rxjs";
import {Page} from "./model/page";

export interface CrudApiMethods<T> {

  create(data: T): Observable<T>

  update(data: T): Observable<T>

  delete(id: number): Observable<void>

  getOne(id: number): Observable<T>

  getList(): Observable<T[]>
}

export interface PagingApiMethods<T> {

  getPagingList(): Observable<Page<T>>;
}
