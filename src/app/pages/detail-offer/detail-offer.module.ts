import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DetailOfferRoutingModule } from './detail-offer-routing.module';
import { DetailOfferComponent } from './detail-offer.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CardOfferDetailComponent } from './components/card-offer-detail/card-offer-detail.component';
import { NbCardModule, NbListModule } from '@nebular/theme';
import { RecommendationsComponent } from './components/recommendations/recommendations.component';
import { CommentsComponent } from './components/comments/comments.component';
import { ContentOfferComponent } from './components/content-offer/content-offer.component';


@NgModule({
  declarations: [
    DetailOfferComponent,
    CardOfferDetailComponent,
    RecommendationsComponent,
    CommentsComponent,
    ContentOfferComponent
  ],
  imports: [
    CommonModule,
    DetailOfferRoutingModule,
    NbCardModule,
    NbListModule,
    SharedModule
  ],
  exports: [
    ContentOfferComponent
  ]
})
export class DetailOfferModule { }
