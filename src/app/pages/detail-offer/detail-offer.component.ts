import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OfferDetail } from 'src/app/shared/model/offer.model';
import { environment } from 'src/environments/environment';

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
    this.offer.image = 'https://offer-images-public.s3.amazonaws.com/35389aeb-dfe1-4115-8671-6661b1cfe3db/0cc1ddf6-76b0-4590-99d1-7b8d0ba2270e.jpg';
  }

  getMapURL(): string {
    return `https://www.google.com/maps/embed/v1/place?key=${environment.mapKey}&q=${this.offer.location.latitude},${this.offer.location.longitude}`;
  }

}
