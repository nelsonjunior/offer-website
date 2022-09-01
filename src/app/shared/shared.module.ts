import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TruncatePipe } from './pipes/truncate.pipe';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { NbButtonModule, NbIconModule } from '@nebular/theme';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SocialMediaComponent } from './components/social-media/social-media.component';



@NgModule({
  declarations: [TruncatePipe, SocialMediaComponent],
  imports: [
    CommonModule,
    NbButtonModule,
    NbEvaIconsModule,
    NbIconModule,
    FontAwesomeModule
  ],
  exports: [
    NbButtonModule,
    NbEvaIconsModule,
    NbIconModule,
    FontAwesomeModule,
    TruncatePipe,
    SocialMediaComponent
  ],
})
export class SharedModule { }
