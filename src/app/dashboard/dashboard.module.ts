import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashboardPageRoutingModule } from './dashboard-routing.module';

import { DashboardPage } from './dashboard.page';
import { AuthService } from '../service/auth.service';
import { AuthServiceImpl } from '../service/impl/auth.service.impl';
import { FamilyService } from '../service/family.service';
import { FamilyServiceImpl } from '../service/impl/family.service.impl';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DashboardPageRoutingModule
  ],
  declarations: [DashboardPage],
  providers: [
    { provide: AuthService, useClass: AuthServiceImpl },
    { provide: FamilyService, useClass: FamilyServiceImpl }
  ]
})
export class DashboardPageModule {}
