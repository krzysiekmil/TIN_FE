import {Observable} from "rxjs";

export interface CrudApiMethods<T> {

  create(data: T): Observable<T>

  update(data: T): Observable<T>

  delete(id: number): Observable<void>

  getOne(id: number): Observable<T>

  getList(): Observable<T[]>
}
