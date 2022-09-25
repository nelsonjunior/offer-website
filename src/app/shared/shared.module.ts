import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TruncatePipe } from './pipes/truncate.pipe';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { NbButtonModule, NbIconModule } from '@nebular/theme';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SocialMediaComponent } from './components/social-media/social-media.component';
import { SanitizerPipe } from './pipes/sanitizer.pipe';
import { StoreInfoComponent } from './components/store-info/store-info.component';
import { CurrencyMaskConfig, CurrencyMaskModule, CURRENCY_MASK_CONFIG } from 'ng2-currency-mask';
import { StoreResolver } from './resolvers/store.resolver';

export const CustomCurrencyMaskConfig: CurrencyMaskConfig = {
  align: "right",
  allowNegative: true,
  decimal: ",",
  precision: 2,
  prefix: "R$ ",
  suffix: "",
  thousands: "."
};

@NgModule({
  declarations: [TruncatePipe, SocialMediaComponent, StoreInfoComponent, SanitizerPipe],
  imports: [
    CommonModule,
    NbButtonModule,
    NbEvaIconsModule,
    NbIconModule,
    FontAwesomeModule,
    CurrencyMaskModule,
  ],
  exports: [
    NbButtonModule,
    NbEvaIconsModule,
    NbIconModule,
    FontAwesomeModule,
    CurrencyMaskModule,
    TruncatePipe,
    SanitizerPipe,
    SocialMediaComponent,
    StoreInfoComponent
  ],
  providers: [
      { provide: CURRENCY_MASK_CONFIG, useValue: CustomCurrencyMaskConfig }
  ]
})
export class SharedModule { }
