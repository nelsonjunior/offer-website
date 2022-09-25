import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NbCardModule, NbDialogModule, NbFormFieldModule, NbInputModule, NbWindowModule } from '@nebular/theme';
import { TableModule } from 'ngx-easy-table';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    ProfileComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NbInputModule,
    NbFormFieldModule,
    NbCardModule,
    NbDialogModule.forChild(),
    TableModule,
    NbWindowModule.forChild(),
    SharedModule
  ]
})
export class ProfileModule { }
