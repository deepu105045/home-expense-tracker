/* eslint-disable guard-for-in */
import { KeyValue } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { merge, Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { Cashflow } from 'src/app/common/cashflow';
import { CommonService } from 'src/app/service/common.service';
import { TransactionService } from 'src/app/service/Transaction.service';
import { TransactionComponent } from '../transaction/transaction.component';
import { ViewTransactionsPage } from '../view-transactions/view-transactions.page';

@Component({
  selector: 'app-expense-dashboard',
  templateUrl: './expense-dashboard.page.html',
  styleUrls: ['./expense-dashboard.page.scss'],
})
export class ExpenseDashboardPage implements OnInit {

  familyId: any;
  currentMonth: string;
  currentYear: number;
  index: number;

  spending$: Observable<any>;
  income$: Observable<any>;
  investment$: Observable<any>;

  spendingTotal$: Observable<any>;
  incomeTotal$: Observable<any>;
  investmentTotal$: Observable<any>;
  balanceTotal$: Observable<any>;

  spendingTotal =0.0;
  incomeTotal = 0.0;
  investmentTotal =0.0;
  balance =0.0;

  showIncomeDetails = false;
  showInvestmentDetails= false;
  showSpendingDetails= true;


  keyDescOrder: (a: KeyValue<number, string>, b: KeyValue<number, string>) => number;


  constructor(public modalController: ModalController, public actionSheetController: ActionSheetController,
              public router: Router,private activatedroute: ActivatedRoute,
              private transactionService: TransactionService, private commonService: CommonService) { }

  async ngOnInit() {
    this.familyId = this.activatedroute.snapshot.paramMap.get('id');
    this.currentYear = await this.commonService.getCurrentYear();
    this.currentMonth = await this.commonService.getCurrentMonth();
    this.index = +this.commonService.getKeyFromMonth(this.currentMonth);
    await this.groupall();
    this.keyDescOrder = (a: KeyValue<number,string>, b: KeyValue<number,string>): number =>
        a.value > b.value ? -1 : (b.value > a.value ? 1 : 0);

  }

  async navigation(direction){
    this.spendingTotal =0.0;
    this.incomeTotal = 0.0;
    this.investmentTotal =0.0;
    this.balance =0.0;

    this.index = +this.commonService.getKeyFromMonth(this.currentMonth);

    if(direction === 'previous'){
      if(+this.index === 1){
            this.index = 12;
            this.currentYear = +this.currentYear-1;
          }else{
            this.index = this.index -1;
          }
    }else{
      if(+this.index === 12){
            this.index = 1;
            this.currentYear = +this.currentYear+1;
          }else{
            this.index = this.index + 1;
          }
    }
    this.currentMonth = this.commonService.getAllMonths(this.index);
    await this.groupall();

  }

  async groupall(){
    const total ='total';
    this.balance =0;

    // Get Income, Spending and investmen totals
    this.spendingTotal$ = this.transactionService.getTotals(this.familyId,this.currentYear,this.index,Cashflow.SPENDING);
    this.incomeTotal$ = this.transactionService.getTotals(this.familyId,this.currentYear,this.index,Cashflow.INCOME);
    this.investmentTotal$ = this.transactionService.getTotals(this.familyId,this.currentYear,this.index,Cashflow.INVESTMENT);
    this.balanceTotal$ = this.transactionService.getTotals(this.familyId,this.currentYear,this.index,Cashflow.BALANCE);

    //Get indiciual categories under each main category and its consolidated amount.
    this.spending$ = this.transactionService.getGroupedData(this.familyId,this.currentYear,this.index,Cashflow.SPENDING);
    this.income$ = this.transactionService.getGroupedData(this.familyId,this.currentYear,this.index,Cashflow.INCOME);
    this.investment$ = this.transactionService.getGroupedData(this.familyId,this.currentYear,this.index,Cashflow.INVESTMENT);


    await this.spendingTotal$.pipe(take(1)).subscribe(res =>{
      if(res){
        this.spendingTotal = res[total];
      }
    });

    await this.incomeTotal$.pipe(take(1)).subscribe(res =>{
      if(res){
        this.incomeTotal = res[total];
      }
    });

    await this.investmentTotal$.pipe(take(1)).subscribe(res =>{
      if(res){
        this.investmentTotal = res[total];
      }
    });

    await this.balanceTotal$.pipe(take(1)).subscribe(res =>{
      if(res){
        this.balance = res[total];
      }
    });






  }

  async openTransactionModal(type) {
    const modal = await this.modalController.create({
      component: TransactionComponent,
      componentProps: {
        type, familyId: this.familyId
      }
    });
    return await modal.present();
  }

  async viewTransactions(){
    const modal = await this.modalController.create({
      component: ViewTransactionsPage,
      componentProps: {
       familyId: this.familyId,
       year: this.currentYear,
       month: this.index
      }
    });
    return await modal.present();
  }

  async openSettings() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Settings',
      buttons: [
        {
          text: 'Create Famliy',
          handler: () => {
            this.router.navigate(['create-family']);
          }
        },
          {
          text: 'Add Members',
          handler: () => {
            this.router.navigate(['add-members']);
          }
        },
        {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
      }]
    });
    await actionSheet.present();
  }

  toggleIncome(){
    this.showIncomeDetails = !this.showIncomeDetails;
  }
  toggleSpending(){
    this.showSpendingDetails = !this.showSpendingDetails;
  }
  toggleInvestment(){
    this.showInvestmentDetails = !this.showInvestmentDetails;
  }






}


