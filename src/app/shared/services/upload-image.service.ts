import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, mergeMap, Observable, of, switchMap, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { OfferImage } from '../model/offer.model';
import { UrlFromUpload } from '../model/upload.model';

@Injectable({
  providedIn: 'root',
})
export class UploadImageService {
  constructor(private http: HttpClient) {}

  getUrlFromUpload(slug: string): Observable<UrlFromUpload> {
    return this.http.get<UrlFromUpload>(environment.api_upload);
  }

  uploadImage(url: UrlFromUpload, file: File): Observable<OfferImage> {
    return this.http.put(url.url, file, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'image/jpeg'
      },
    }).pipe(
      switchMap((res) => of({
        fileName: url.fileName,
        file: file
      }))
    );
  }

  uploadFile(file: File): Observable<OfferImage> {
    return this.getUrlFromUpload(file.name)
      .pipe(
        switchMap((url) => this.uploadImage(url, file)),
      );
  }
}
