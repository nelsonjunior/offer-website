import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { RouterModule } from '@angular/router';
import { NbButtonModule, NbCardModule, NbCheckboxModule, NbIconModule, NbInputModule, NbLayoutModule, NbListModule, NbSelectModule, NbSidebarModule, NbSpinnerModule, NbTooltipModule } from '@nebular/theme';
import { FormsModule } from '@angular/forms';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { AdvertsFilterComponent } from './components/adverts-filter/adverts-filter.component';
import { OffersTitleComponent } from './components/offers-title/offers-title.component';
import { BarRatingModule } from 'ngx-bar-rating';
import { NgxMaskModule } from 'ngx-mask';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CardOfferComponent } from './components/card-oferta/card-offer.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';


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
    NbEvaIconsModule,
    NbIconModule,
    FontAwesomeModule,
    FormsModule,
    RouterModule, // RouterModule.forRoot(routes, { useHash: true }), if this is your app.module
    NbLayoutModule,
    NbSidebarModule, // NbSidebarModule.forRoot(), //if this is your app.module
    NbButtonModule,
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
    InfiniteScrollModule
  ]
})
export class HomeModule { }
