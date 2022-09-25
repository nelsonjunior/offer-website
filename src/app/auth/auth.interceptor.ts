import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { catchError, filter, from, map, mergeMap, Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService
  ) {}

  intercept(request: HttpRequest<any>,
    next: HttpHandler): Observable<HttpEvent<any>> {
    return from(this.authService.currentSession())
    .pipe(
      filter(session => !!session),
      map((session: any) => session.getAccessToken().getJwtToken()),
      mergeMap((token: string) =>
        next.handle(request.clone({setHeaders: {Authorization: `Bearer ${token}`}}))),
      catchError((err) => {
        console.log('AuthInterceptor', err);
        return next.handle(request);
      })
    );
    }
}
