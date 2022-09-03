import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Comment } from '../model/comment.model';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) { }

  getCommentsByOfferID(id: number, page: number = 1, limit: number = 5): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${environment.api}/offers/${id}/comments/?_page${page}&_limit=${limit}`);
  }
}
