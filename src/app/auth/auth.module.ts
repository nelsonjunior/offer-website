import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { LoginComponent } from './components/login/login.component';
import { NbCardModule, NbFormFieldModule, NbInputModule, NbWindowModule } from '@nebular/theme';
import { RegisterComponent } from './components/register/register.component';
import { AuthComponent } from './auth.component';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    AuthComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NbCardModule,
    NbInputModule,
    NbFormFieldModule,
    NbWindowModule,
    SharedModule
  ]
})
export class AuthModule { }
