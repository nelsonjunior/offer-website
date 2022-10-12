import { Component } from '@angular/core';
import { NbWindowRef } from '@nebular/theme';
import { Offer } from 'src/app/shared/model/offer.model';
import { Store } from 'src/app/shared/model/store.model';

@Component({
  selector: 'app-window-detail-offer',
  templateUrl: './window-detail-offer.component.html',
  styleUrls: ['./window-detail-offer.component.scss']
})
export class WindowDetailOfferComponent {

  offer!: Offer;

  store!: Store;

  constructor(
    protected windowRef: NbWindowRef
  ) {

    const context = this.windowRef.config.context as DetailOfferContext;

    this.offer = context.offer;
    this.store = this.store;
  }

}

export interface DetailOfferContext {
  offer: Offer;
  store: Store;
}
