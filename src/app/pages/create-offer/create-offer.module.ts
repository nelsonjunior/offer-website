import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateOfferRoutingModule } from './create-offer-routing.module';
import { CreateOfferComponent } from './create-offer.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NbAlertModule, NbButtonModule, NbCardModule, NbDatepickerModule, NbFormFieldModule, NbInputModule, NbSelectModule, NbSpinnerModule } from '@nebular/theme';
import { NbDateFnsDateModule } from '@nebular/date-fns';
import { ptBR } from 'date-fns/locale';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { NgxDropzoneModule } from 'ngx-dropzone';


@NgModule({
  declarations: [
    CreateOfferComponent
  ],
  imports: [
    CommonModule,
    CreateOfferRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NbCardModule,
    NbButtonModule,
    NbInputModule,
    NbSelectModule,
    NbAlertModule,
    NbFormFieldModule,
    NbSpinnerModule,
    NbDatepickerModule.forRoot(),
    NbDateFnsDateModule.forRoot(
      {
        format: 'dd/MM/yyyy',
        parseOptions: { locale: ptBR },
        formatOptions: { locale: ptBR }
      }),
    NgxMaskModule.forRoot({
      validation: true,
      thousandSeparator: '.',
    }),
    NgxDropzoneModule,
    SharedModule
  ]
})
export class CreateOfferModule { }
