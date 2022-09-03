import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Recommendation } from '../model/recommendation.model';

@Injectable({
  providedIn: 'root'
})
export class RecommendationService {

  constructor(private http: HttpClient) {}

  getByOfferID(id: number, page: number = 1, limit: number = 5): Observable<Recommendation[]> {
    return this.http.get<Recommendation[]>(`${environment.api}/offers/${id}/recommendations/?_page${page}&_limit=${limit}`);
  }
}
