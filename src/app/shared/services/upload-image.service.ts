import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UrlFromUpload } from '../model/upload.model';

@Injectable({
  providedIn: 'root',
})
export class UploadImageService {
  constructor(private http: HttpClient) {}

  uploadImage(file: File): Observable<UrlFromUpload> {
    return this.http.put<UrlFromUpload>(environment.api_upload, file).pipe(
      tap((res) => console.log(res))
    );
  }

}
