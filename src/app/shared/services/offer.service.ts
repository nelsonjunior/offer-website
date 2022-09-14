import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CreateOffer, Offer, OfferDetail, OfferFilter, OfferResponse, OfferShort, OfferShortResponse } from '../model/offer.model';

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

  publish(offer: CreateOffer): Observable<OfferShort> {
    console.log(offer);
    return of({
      id: 1,
      description: offer.description,
    });
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${environment.api}/offers/${id}`);
  }

  getBySlug(slug: string): Observable<OfferDetail> {
    return this.http.get<OfferDetail[]>(`${environment.api}/offers?slug=${slug}`).pipe(
      map((offers) => {
        return offers[0];
      })
    );
  }
}
