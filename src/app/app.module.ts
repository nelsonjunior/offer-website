import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  NbThemeModule,
  NbLayoutModule,
  NbSidebarModule,
  NbListModule,
  NbContextMenuModule,
  NbMenuModule,
  NbSearchModule,
  NbFormFieldModule,
  NbInputModule,
  NbAutocompleteModule,
} from '@nebular/theme';
import { TemplateComponent } from './pages/template/template.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NavegationBarComponent } from './pages/template/components/navegation-bar/navegation-bar.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [AppComponent, TemplateComponent, NavegationBarComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    NbThemeModule.forRoot({ name: 'default' }),
    NbLayoutModule,
    NbThemeModule.forRoot(),
    RouterModule, // RouterModule.forRoot(routes, { useHash: true }), if this is your app.module
    NbLayoutModule,
    NbSidebarModule, // NbSidebarModule.forRoot(), //if this is your app.module
    NbListModule,
    NbMenuModule.forRoot(),
    NbContextMenuModule,
    NbSearchModule,
    NbInputModule,
    NbFormFieldModule,
    NbAutocompleteModule,
    NbSidebarModule.forRoot(),
    HttpClientModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
