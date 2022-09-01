import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DetailOfferRoutingModule } from './detail-offer-routing.module';
import { DetailOfferComponent } from './detail-offer.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CardOfferDetailComponent } from './components/card-offer-detail/card-offer-detail.component';
import { NbCardModule } from '@nebular/theme';


@NgModule({
  declarations: [
    DetailOfferComponent,
    CardOfferDetailComponent
  ],
  imports: [
    CommonModule,
    DetailOfferRoutingModule,
    NbCardModule,
    SharedModule
  ]
})
export class DetailOfferModule { }
