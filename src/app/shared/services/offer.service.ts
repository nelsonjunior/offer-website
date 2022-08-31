import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Offer, OfferFilter, OfferResponse, OfferShort, OfferShortResponse } from '../model/offer.model';

@Injectable({
  providedIn: 'root',
})
export class OfferService {
  constructor(private http: HttpClient) {}

  list(
    page: number,
    limit: number,
    filter: OfferFilter
  ): Observable<OfferResponse> {
    return this.http
      .get<Offer[]>(`${environment.api}/offers?_page=${page}&_limit=${limit}${!!filter.term ? `&description_like=${filter.term}` : ''}`)
      .pipe(
        map((offers) => {
          return {
            message: 'List offers',
            result: offers,
            page: page,
          };
        })
      );
  }

  search(term: string): Observable<OfferShortResponse> {
    return this.http.get<Offer[]>(`${environment.api}/offers?q=${term}`).pipe(
      map((offers) => {
        return offers.filter((offer) => offer.description.includes(term));
      }),
      map((offers) => {
        return offers.map((offer) => ({
          id: offer.id,
          description: offer.description,
        } as OfferShort));
      }),
      map((offers) => {
        return {
          message: 'Search offers',
          result: offers,
        };
      })
    );
  }
}
