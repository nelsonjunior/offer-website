import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyOffersRoutingModule } from './my-offers-routing.module';
import { MyOffersComponent } from './my-offers.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NbCardModule } from '@nebular/theme';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';


@NgModule({
  declarations: [
    MyOffersComponent
  ],
  imports: [
    CommonModule,
    MyOffersRoutingModule,
    NbCardModule,
    NgxDatatableModule,
    SharedModule
  ]
})
export class MyOffersModule { }
