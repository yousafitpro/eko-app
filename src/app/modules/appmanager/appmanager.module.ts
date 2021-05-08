import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppmanagerRoutingModule } from './appmanager-routing.module';
import { IonicModule } from '@ionic/angular';
import { DefaultComponent } from './comps/default/default.component';
import { AppUpdateComponent } from './comps/app-update/app-update.component';
import { AppmanagerComponent } from './appmanager.component';


@NgModule({
  declarations: [
    AppmanagerComponent,
    DefaultComponent,
    AppUpdateComponent
  ],
  imports: [
    CommonModule,
    AppmanagerRoutingModule,
    IonicModule
  ]
})
export class AppmanagerModule { }
