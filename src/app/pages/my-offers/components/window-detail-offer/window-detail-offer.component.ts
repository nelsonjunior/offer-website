import { Component, Input, OnInit } from '@angular/core';
import { NbWindowRef } from '@nebular/theme';
import { OfferDetail } from 'src/app/shared/model/offer.model';

@Component({
  selector: 'app-window-detail-offer',
  templateUrl: './window-detail-offer.component.html',
  styleUrls: ['./window-detail-offer.component.scss']
})
export class WindowDetailOfferComponent implements OnInit {

  offer!: OfferDetail;

  constructor(
    protected windowRef: NbWindowRef
  ) {
    this.offer = this.windowRef?.config?.context as OfferDetail;
  }

  ngOnInit(): void {
  }

}
