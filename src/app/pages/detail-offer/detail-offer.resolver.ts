import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot} from '@angular/router';
import { Observable } from 'rxjs';
import {  Offer, OfferShort } from 'src/app/shared/model/offer.model';
import { HiddenParamService } from 'src/app/shared/services/hidden-param.service';
import { OfferService } from 'src/app/shared/services/offer.service';

@Injectable({
  providedIn: 'root'
})
export class DetailOfferResolver implements Resolve<Offer> {

  constructor(
    private offerService: OfferService,
    private hiddenParam: HiddenParamService,
  ) { }

  resolve(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<Offer> {

    const offer = this.hiddenParam.currentParam as unknown as OfferShort;

    if(!!offer?.offerID) {
      return this.offerService.getByID(offer.offerID)
    }

    return this.offerService.getBySlug(route.params['slug']);
  }
}
