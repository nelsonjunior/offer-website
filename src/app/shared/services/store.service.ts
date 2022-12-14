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

  getByID(storeID: string): Observable<Store> {
    return this.http.get<Store>(`${environment.api}/stores/${storeID}`);
  }

  update(store: Store): Observable<Store> {
    return this.http.put<Store>(`${environment.api}/stores/${store.storeID}`, store);
  }

}
