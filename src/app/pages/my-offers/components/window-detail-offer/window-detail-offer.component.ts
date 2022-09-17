import { Component, OnInit } from '@angular/core';
import { NbWindowRef } from '@nebular/theme';
import { Offer } from 'src/app/shared/model/offer.model';

@Component({
  selector: 'app-window-detail-offer',
  templateUrl: './window-detail-offer.component.html',
  styleUrls: ['./window-detail-offer.component.scss']
})
export class WindowDetailOfferComponent implements OnInit {

  offer!: Offer;

  constructor(
    protected windowRef: NbWindowRef
  ) {
    this.offer = this.windowRef?.config?.context as Offer;
  }

  ngOnInit(): void {
  }

}
