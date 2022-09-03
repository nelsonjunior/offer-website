import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TemplateComponent } from './pages/template/template.component';

const routes: Routes = [
  {
    path: '',
    component: TemplateComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./pages/home/home.module').then((m) => m.HomeModule),
      },
      {
        path: 'offer',
        loadChildren: () =>
          import('./pages/detail-offer/detail-offer.module').then((m) => m.DetailOfferModule),
      },
      {
        path: 'create-offer',
        loadChildren: () =>
          import('./pages/create-offer/create-offer.module').then(m => m.CreateOfferModule)
      }
    ],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
