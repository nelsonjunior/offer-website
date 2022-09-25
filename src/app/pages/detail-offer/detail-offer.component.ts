import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Offer } from 'src/app/shared/model/offer.model';
import { Store } from 'src/app/shared/model/store.model';
import { StoreService } from 'src/app/shared/services/store.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-detail-offer',
  templateUrl: './detail-offer.component.html',
  styleUrls: ['./detail-offer.component.scss']
})
export class DetailOfferComponent implements OnInit {

  offer: Offer = this.activatedRoute.snapshot.data['offer'];

  store$: Observable<Store> = this.storeService.getByID(this.offer.store.storeID);

  storeOffer: Store = {
    storeID: this.offer.store.storeID,
    name: this.offer.store.name,
    description: '',
    image: '',
    latitude: 0,
    longitude: 0,
    status: ''
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private storeService: StoreService
  )
  { }

  ngOnInit(): void {
  }

  getMapURL(): string {
    // return `https://www.google.com/maps/embed/v1/place?key=${environment.mapKey}&q=${this.offer.location.latitude},${this.offer.location.longitude}`;
    return `https://www.google.com/maps/embed/v1/place?key=${environment.mapKey}`;
  }

}
