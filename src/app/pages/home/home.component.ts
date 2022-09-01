import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NbLayoutScrollService } from '@nebular/theme';
import { Offer, OfferFilter } from 'src/app/shared/model/offer.model';
import { OfferService } from 'src/app/shared/services/offer.service';
import ArraysUtils from 'src/app/shared/utils/arrays.util';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {

  lastIndexOffer = 0;

  offerData: OfferData = {
    offers: [],
    loading: false,
    pageToLoadNext: 1,
  };

  pageSize = 9;

  filter: OfferFilter = {
    orderBy: 0,
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private offerService: OfferService,
    private scrollService: NbLayoutScrollService,
    private router: Router
  ) {

    this.activatedRoute.queryParams.subscribe(params => {

        const term = params['q'];

        this.scrollService.scrollTo(0, 0);

        this.filter = {...this.filter, term: term};

        this.initLoad();
    });
  }

  initLoad(): void {

    this.offerData = {
      offers: [],
      loading: false,
      pageToLoadNext: 1,
    };

    this.loadNext(this.offerData);
  }

  onChangeOrder(order: number) {

    this.filter = {...this.filter, orderBy: order};

    this.initLoad();
  }

  onChangeFilter(filter: OfferFilter) {

    this.filter = {...filter, orderBy: this.filter.orderBy};

    this.initLoad();
  }

  loadNext(data: OfferData): void {

    if (data.loading) { return }

    data.loading = true;

    this.offerService.list(data.pageToLoadNext, this.pageSize, this.filter)
      .subscribe(newOffers => {
        data.offers.push(...ArraysUtils.chunk(newOffers.result, 3));
        data.loading = false;
        data.pageToLoadNext++;
      });
  }

  openDetail(offer: Offer): void {
    this.router.navigate(['/offer', offer.slug]);
  }

}

export interface OfferData {
  offers: Offer[][],
  loading: boolean,
  pageToLoadNext: number,
};
