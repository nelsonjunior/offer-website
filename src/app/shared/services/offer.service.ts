import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CreateOffer, Offer, OfferFilter, OfferPage, OfferResponse, OfferShortResponse } from '../model/offer.model';

@Injectable({
  providedIn: 'root',
})
export class OfferService {

  constructor(private http: HttpClient) {}

  list(
    storeID: string,
    searchTerm: string = ''
  ): Observable<Offer[]> {
    return this.http.get<Offer[]>(`${environment.api}/offers/?searchTerm=${searchTerm}&storeID=${storeID}`);
  }

  search(
    page: number,
    limit: number,
    filter: OfferFilter
  ): Observable<OfferResponse> {

    let query = `${environment.api}/offers/search?page=${page - 1}&limit=${limit}`;

    if(!!filter.term) {
      query += `&term=${filter.term}`;
    }

    if(!!filter.categories) {
      query += `&categories=${filter.categories.map((category) => category.categoryID).join(',')}`;
    }

    if(!!filter.minPrice) {
      query += `&minPrice=${filter.minPrice}`;
    }

    if(!!filter.maxPrice) {
      query += `&maxPrice=${filter.maxPrice}`;
    }

    if(!!filter.rate) {
      query += `&rate=${filter.rate}`;
    }

    return this.http
      .get<Offer[]>(query)
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

  suggestions(term: string): Observable<OfferShortResponse> {
    return this.http.get<Offer[]>(`${environment.api}/offers/suggestions?q=${term}`).pipe(
      map((offers) => {
        return {
          message: 'Search offers',
          result: offers,
        };
      })
    );
  }

  publish(offer: CreateOffer): Observable<Offer> {
    console.log(offer);
    return this.http.post<Offer>(`${environment.api}/offers`, offer);
  }

  delete(offerID: string): Observable<any> {
    return this.http.delete(`${environment.api}/offers/${offerID}`);
  }

  getByID(offerID: string): Observable<Offer> {
    return this.http.get<Offer>(`${environment.api}/offers/${offerID}`);
  }

  getBySlug(slug: string): Observable<Offer> {
    return this.http.get<Offer>(`${environment.api}/offers/slug/${slug}`);
  }
}
