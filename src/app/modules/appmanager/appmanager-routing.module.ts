import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppmanagerComponent } from './appmanager.component';
import { DefaultComponent } from './comps/default/default.component';
import { AppUpdateComponent } from './comps/app-update/app-update.component';

const routes: Routes = [
  {path:'',component:AppmanagerComponent,
  children:[
      {path:'appUpdate',component:AppUpdateComponent},
      {path:'',component:DefaultComponent},

  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppmanagerRoutingModule { }
