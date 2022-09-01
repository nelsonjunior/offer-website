import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OfferDetail } from 'src/app/shared/model/offer.model';

@Component({
  selector: 'app-detail-offer',
  templateUrl: './detail-offer.component.html',
  styleUrls: ['./detail-offer.component.scss']
})
export class DetailOfferComponent implements OnInit {

  offer: OfferDetail = this.activatedRoute.snapshot.data['offer'];

  constructor(
    private activatedRoute: ActivatedRoute
  )
  { }

  ngOnInit(): void {

    console.log('offer', this.offer);

  }

}
