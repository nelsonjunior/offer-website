import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { from, Observable, switchMap } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { Store } from 'src/app/shared/model/store.model';
import { StoreService } from 'src/app/shared/services/store.service';

@Injectable({
  providedIn: 'root',
})
export class StoreResolver implements Resolve<Store> {
  constructor(
    private authService: AuthService,
    private storeService: StoreService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Store> {
    return from(this.authService.getUser()).pipe(
      switchMap((user) => {
        return this.storeService.getByID(user.username);
      })
    );
  }
}
