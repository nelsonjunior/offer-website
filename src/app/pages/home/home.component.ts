import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbLayoutScrollService } from '@nebular/theme';
import { Offer, OfferFilter } from 'src/app/shared/model/offer.model';
import { OfferService } from 'src/app/shared/services/offer.service';
import ArraysUtils from 'src/app/shared/utils/arrays.util';
import { NavegationBarService } from '../template/components/navegation-bar/navegation-bar.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

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
    private offerService: OfferService,
    private navegationBarService: NavegationBarService,
    private scrollService: NbLayoutScrollService,
    private router: Router
  ) {

    this.navegationBarService.searchTerm$.subscribe(term => {

      this.scrollService.scrollTo(0, 0);

      this.filter = {...this.filter, term: term};

      this.initLoad();

    });
  }

  ngOnInit(): void {
    this.initLoad();
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
