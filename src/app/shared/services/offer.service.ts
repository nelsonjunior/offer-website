import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Offer, OfferFilter, OfferResponse } from '../model/offer.model';

@Injectable({
  providedIn: 'root'
})
export class OfferService {

  constructor(
    private http: HttpClient
  ) { }

  list(page: number, limit: number, filter: OfferFilter): Observable<OfferResponse> {
    console.log('OfferService.list', filter);
    return this.http.get<Offer[]>(`${environment.api}/offers?_page=${page}&_limit=${limit}`)
      .pipe(map(offers => {
        return {
          message: 'List offers',
          result: offers,
          page: page,
        };
      }));
  }
}
