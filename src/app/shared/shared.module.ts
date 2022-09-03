import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TruncatePipe } from './pipes/truncate.pipe';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { NbButtonModule, NbIconModule } from '@nebular/theme';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SocialMediaComponent } from './components/social-media/social-media.component';
import { SanitizerPipe } from './pipes/sanitizer.pipe';
import { StoreInfoComponent } from './components/store-info/store-info.component';


@NgModule({
  declarations: [TruncatePipe, SocialMediaComponent, StoreInfoComponent, SanitizerPipe],
  imports: [
    CommonModule,
    NbButtonModule,
    NbEvaIconsModule,
    NbIconModule,
    FontAwesomeModule,
  ],
  exports: [
    NbButtonModule,
    NbEvaIconsModule,
    NbIconModule,
    FontAwesomeModule,
    TruncatePipe,
    SanitizerPipe,
    SocialMediaComponent,
    StoreInfoComponent
  ],
})
export class SharedModule { }
