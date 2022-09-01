import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailOfferComponent } from './detail-offer.component';
import { DetailOfferResolver } from './detail-offer.resolver';

const routes: Routes = [
    {
      path: ':slug',
      component: DetailOfferComponent,
      resolve: {
        offer: DetailOfferResolver
      }
    }
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DetailOfferRoutingModule { }
