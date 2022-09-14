import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, switchMap, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UrlFromUpload } from '../model/upload.model';

@Injectable({
  providedIn: 'root',
})
export class UploadImageService {
  constructor(private http: HttpClient) {}

  getUrlFromUpload(slug: string): Observable<UrlFromUpload> {
    return this.http.get<UrlFromUpload>(environment.api_upload);
  }

  uploadImage(url: UrlFromUpload, file: File): Observable<any> {
    return this.http.put(url.url, file, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'image/jpeg',
        'Content-Length': file.size.toString(),
      },
    }).pipe(
      tap((res) => console.log(res)),
      map((res) => url)
    );
  }

  uploadFile(file: File): Observable<UrlFromUpload> {
    return this.getUrlFromUpload(file.name)
      .pipe(
        tap((url) => console.log(url)),
        switchMap((url) => this.uploadImage(url, file)),
      );
  }
}
