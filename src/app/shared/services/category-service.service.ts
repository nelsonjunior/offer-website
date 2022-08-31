import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Category, CategoryResponse } from '../model/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryServiceService {

  public categories$: Observable<Category[]>
    = this.list().pipe(map(({ result }) => result));;

  constructor(
    private http: HttpClient
  ) { }

  list(): Observable<CategoryResponse> {
    return this.http.get<Category[]>(`${environment.api}/categories`)
      .pipe(map(categories => {
        return {
          message: 'List categories',
          result: categories
        };
      }));
  }
}
