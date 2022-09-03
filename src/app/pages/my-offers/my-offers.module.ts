import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyOffersRoutingModule } from './my-offers-routing.module';
import { MyOffersComponent } from './my-offers.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NbCardModule, NbDialogModule, NbFormFieldModule, NbInputModule, NbWindowModule } from '@nebular/theme';
import { TableModule } from 'ngx-easy-table';
import { DetailOfferModule } from '../detail-offer/detail-offer.module';
import { WindowDetailOfferComponent } from './components/window-detail-offer/window-detail-offer.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    MyOffersComponent,
    WindowDetailOfferComponent
  ],
  imports: [
    CommonModule,
    MyOffersRoutingModule,
    FormsModule,
    NbInputModule,
    NbFormFieldModule,
    NbCardModule,
    NbDialogModule.forChild(),
    TableModule,
    NbWindowModule.forChild(),
    DetailOfferModule,
    SharedModule
  ]
})
export class MyOffersModule { }
