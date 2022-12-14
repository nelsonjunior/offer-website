import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StoreResolver } from 'src/app/shared/resolvers/store.resolver';
import { CreateOfferComponent } from './create-offer.component';

const routes: Routes = [
  {
    path: '',
    component: CreateOfferComponent,
    resolve: {
      store: StoreResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateOfferRoutingModule { }
