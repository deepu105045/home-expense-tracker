import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ExpenseDashboardPageRoutingModule } from './expense-dashboard-routing.module';
import { ExpenseDashboardPage } from './expense-dashboard.page';
import { TransactionComponent } from '../transaction/transaction.component';
import { TransactionService } from 'src/app/service/Transaction.service';
import { TransactionServiceImpl } from 'src/app/service/impl/transaction.service.impl';
import { SpinnerService } from 'src/app/service/Spinner.service';
import { SpinnerServiceImpl } from 'src/app/service/impl/Spinner.service.impl';
import { SharedModule } from 'src/app/common/shared.module';
import { CategoryService } from 'src/app/service/Category.service';
import { CategoryServiceImpl } from 'src/app/service/impl/categories.service.impl';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ExpenseDashboardPageRoutingModule,
    SharedModule
  ],
  declarations: [ExpenseDashboardPage,TransactionComponent],
  providers: [
    { provide: TransactionService, useClass: TransactionServiceImpl },
    { provide: SpinnerService, useClass: SpinnerServiceImpl },
    { provide: CategoryService , useClass: CategoryServiceImpl}
  ]
})
export class ExpenseDashboardPageModule {}
