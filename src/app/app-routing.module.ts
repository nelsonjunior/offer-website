import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
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
          import('./pages/detail-offer/detail-offer.module').then(
            (m) => m.DetailOfferModule
          ),
      },
      {
        path: 'create-offer',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./pages/create-offer/create-offer.module').then(
            (m) => m.CreateOfferModule
          ),
      },
      {
        path: 'my-offers',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./pages/my-offers/my-offers.module').then(
            (m) => m.MyOffersModule
          ),
      },
      {
        path: 'profile',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./pages/profile/profile.module').then((m) => m.ProfileModule),
      },
      {
        path: 'login',
        loadChildren: () =>
          import('./auth/auth.module').then((m) => m.AuthModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
