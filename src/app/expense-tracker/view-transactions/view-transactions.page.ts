import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
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

  constructor(public modalController: ModalController,  private transactionService: TransactionService) { }
  ngOnInit() {
    this.transactions$ = this.transactionService.viewTransactions(this.familyId,this.year,this.month);
  }
  dismissModal() {
    this.modalController.dismiss({
      dismissed: true
    });
  }
  onWillDismiss(){
    console.log('onWillDismiss');
  }

}
