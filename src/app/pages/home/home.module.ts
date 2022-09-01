import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { RouterModule } from '@angular/router';
import { NbCardModule, NbCheckboxModule, NbInputModule, NbLayoutModule, NbListModule, NbSelectModule, NbSidebarModule, NbSpinnerModule, NbTooltipModule } from '@nebular/theme';
import { FormsModule } from '@angular/forms';
import { AdvertsFilterComponent } from './components/adverts-filter/adverts-filter.component';
import { OffersTitleComponent } from './components/offers-title/offers-title.component';
import { BarRatingModule } from 'ngx-bar-rating';
import { NgxMaskModule } from 'ngx-mask';
import { CardOfferComponent } from './components/card-oferta/card-offer.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    HomeComponent,
    AdvertsFilterComponent,
    OffersTitleComponent,
    CardOfferComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    RouterModule, // RouterModule.forRoot(routes, { useHash: true }), if this is your app.module
    NbLayoutModule,
    NbSidebarModule, // NbSidebarModule.forRoot(), //if this is your app.module
    NbSelectModule,
    NbCardModule,
    NbCheckboxModule,
    NbInputModule,
    NbTooltipModule,
    NbListModule,
    NbSpinnerModule,
    BarRatingModule,
    NgxMaskModule.forRoot({
      validation: true,
      thousandSeparator: '.',
    }),
    NgxSkeletonLoaderModule,
    InfiniteScrollModule,
    SharedModule
  ]
})
export class HomeModule { }
