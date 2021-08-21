import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExpenseDashboardPageRoutingModule } from './expense-dashboard-routing.module';

import { ExpenseDashboardPage } from './expense-dashboard.page';
import { TransactionComponent } from '../transaction/transaction.component';
import { TransactionService } from 'src/app/service/Transaction.service';
import { TransactionServiceImpl } from 'src/app/service/impl/transaction.service.impl';
import { FamilyService } from 'src/app/service/family.service';
import { FamilyServiceImpl } from 'src/app/service/impl/family.service.impl';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ExpenseDashboardPageRoutingModule
  ],
  declarations: [ExpenseDashboardPage,TransactionComponent],
  providers: [
    { provide: TransactionService, useClass: TransactionServiceImpl }
  ]
})
export class ExpenseDashboardPageModule {}
