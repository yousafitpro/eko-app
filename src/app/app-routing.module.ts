import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:'appManager',
  loadChildren:()=>import('./modules/appmanager/appmanager.module').then(m => m.AppmanagerModule)},
  
  {path:'shop',
  loadChildren:()=>import('./modules/shop/shop.module').then(m => m.ShopModule)},
  {path:'myshop',
  loadChildren:()=>import('./modules/myshop/myshop.module').then(m => m.MyshopModule)},
  
  {
    path: '',
    redirectTo: 'appManager',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
