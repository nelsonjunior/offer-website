import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StoreResolver } from 'src/app/shared/resolvers/store.resolver';
import { MyOffersComponent } from './my-offers.component';

const routes: Routes = [
  {
    path: '',
    component: MyOffersComponent,
    resolve: {
      store: StoreResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyOffersRoutingModule { }
