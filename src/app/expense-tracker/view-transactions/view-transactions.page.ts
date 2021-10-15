import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Observable,of } from 'rxjs';
import { Transaction } from 'src/app/interfaces/expense-interface';
import { TransactionService } from 'src/app/service/Transaction.service';
@Component({
  selector: 'app-view-transactions',
  templateUrl: './view-transactions.page.html',
  styleUrls: ['./view-transactions.page.scss'],
})
export class ViewTransactionsPage implements OnInit {

  @Input() year: string;
  @Input() month: string;
  @Input() familyId: string;
  transactions$: Observable<Transaction[]>;
  transactions;

  constructor(public modalController: ModalController,  private transactionService: TransactionService) { }

  ngOnInit() {
    this.transactions$ = this.transactionService.viewTransactions(this.familyId,this.year,this.month);
    this.transactions$.subscribe(results =>{
      results.sort((a,b)=>b.date - a.date);

      this.transactions = results.map(data => {
        const fireBaseTime = new Date(data.date.seconds * 1000 + data.date.nanoseconds / 1000000, );
        data.date = fireBaseTime;
        return data;
      });
      of(this.transactions);
    });

  }
  dismissModal() {
    this.modalController.dismiss({
      dismissed: true
    });
  }
  onWillDismiss(){
    console.log('onWillDismiss');
  }

  delete(transaction: Transaction){
    this.transactionService.deleteTransaction(transaction).then(data =>{
      console.log('Item deleted. and totals adjusted.');
    });
  }



}
