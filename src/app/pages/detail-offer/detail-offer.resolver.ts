import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { OfferDetail } from 'src/app/shared/model/offer.model';
import { OfferService } from 'src/app/shared/services/offer.service';

@Injectable({
  providedIn: 'root'
})
export class DetailOfferResolver implements Resolve<OfferDetail> {

  constructor(
    private offerService: OfferService
  ) { }

  resolve(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<OfferDetail> {
    return this.offerService.getBySlug(route.params['slug']);
  }
}
