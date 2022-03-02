import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FileType, MfeUtil } from '../utils/mfe.utils';

export const mef = new MfeUtil();

const routes: Routes = [
  {
    path: 'home',

    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'restaurants',
    loadChildren: () =>
      mef
        .loadRemoteFile({
          remoteName: 'restaurant',
          remoteEntry:
            'https://module-federation-app2.web.app/remoteRestaurant.js',
          exposedFile: 'RestaurantModule',
          exposeFileType: FileType.Module,
        })
        .then((m) => m.RestaurantModule),
  },
  {
    path: 'order',
    loadChildren: () =>
      import('./pages/order/order.module').then((m) => m.OrderModule),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
      onSameUrlNavigation: 'reload',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
