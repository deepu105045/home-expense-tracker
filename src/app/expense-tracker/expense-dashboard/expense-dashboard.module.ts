import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExpenseDashboardPageRoutingModule } from './expense-dashboard-routing.module';

import { ExpenseDashboardPage } from './expense-dashboard.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExpenseDashboardPageRoutingModule
  ],
  declarations: [ExpenseDashboardPage]
})
export class ExpenseDashboardPageModule {}
