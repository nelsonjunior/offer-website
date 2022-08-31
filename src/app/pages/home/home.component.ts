import { Component, OnInit } from '@angular/core';
import { faFacebookF, faInstagram, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faShareNodes } from '@fortawesome/free-solid-svg-icons';
import { Offer, OfferFilter } from 'src/app/shared/model/offer.model';
import { FooterService } from 'src/app/shared/services/footer.service';
import { OfferService } from 'src/app/shared/services/offer.service';
import ArraysUtils from 'src/app/shared/utils/arrays.util';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  facebook = faFacebookF;
  instagram = faInstagram;
  twitter = faTwitter;
  linkedin = faLinkedin;
  mail = faEnvelope;
  shared = faShareNodes;

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
    private footerService: FooterService,
    private offerService: OfferService
  ) {}

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

  showFooter(): void {
    this.footerService.show();
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

}

export interface OfferData {
  offers: Offer[][],
  loading: boolean,
  pageToLoadNext: number,
};
