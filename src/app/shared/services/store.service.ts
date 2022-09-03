import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Store } from '../model/store.model';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor(private http: HttpClient) {}

  getByID(id: string): Observable<Store> {
    return this.http.get<Store>(`${environment.api}/stores/${id}`);
  }

}
