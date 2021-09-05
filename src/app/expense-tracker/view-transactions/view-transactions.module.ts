import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewTransactionsPageRoutingModule } from './view-transactions-routing.module';

import { ViewTransactionsPage } from './view-transactions.page';
import { TransactionServiceImpl } from 'src/app/service/impl/transaction.service.impl';
import { TransactionService } from 'src/app/service/Transaction.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewTransactionsPageRoutingModule,
  ],
  declarations: [ViewTransactionsPage],
  providers: [
    { provide: TransactionService, useClass: TransactionServiceImpl },
  ]
})
export class ViewTransactionsPageModule {}
