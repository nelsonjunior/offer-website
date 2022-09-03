import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateOfferRoutingModule } from './create-offer-routing.module';
import { CreateOfferComponent } from './create-offer.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NbButton, NbButtonModule, NbCardModule, NbDatepickerModule, NbInputModule, NbSelectModule } from '@nebular/theme';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CreateOfferComponent
  ],
  imports: [
    CommonModule,
    CreateOfferRoutingModule,
    FormsModule,
    NbCardModule,
    NbButtonModule,
    NbInputModule,
    NbSelectModule,
    NbDatepickerModule,
    SharedModule
  ]
})
export class CreateOfferModule { }
