import { Component, Input, OnInit } from '@angular/core';
import { Offer } from 'src/app/shared/model/offer.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-content-offer',
  templateUrl: './content-offer.component.html',
  styleUrls: ['./content-offer.component.scss']
})
export class ContentOfferComponent implements OnInit {

  @Input()
  offer!: Offer;

  constructor() { }

  ngOnInit(): void {
  }

  getMapURL(): string {
    // return `https://www.google.com/maps/embed/v1/place?key=${environment.mapKey}&q=${this.offer.location.latitude},${this.offer.location.longitude}`;

    return `https://www.google.com/maps/embed/v1/place?key=${environment.mapKey}`;
  }

}
