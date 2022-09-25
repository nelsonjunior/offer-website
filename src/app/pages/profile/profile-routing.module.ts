import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { StoreResolver } from '../../shared/resolvers/store.resolver';

const routes: Routes = [
  {
    path: '',
    component: ProfileComponent,
    resolve: {
      store: StoreResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule {}
