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
  }

  getMapURL(): string {
    return `https://www.google.com/maps/embed/v1/place?key=${environment.mapKey}&q=${this.offer.location.latitude},${this.offer.location.longitude}`;
  }

}
