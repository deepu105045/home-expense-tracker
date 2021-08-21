import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { Transaction } from 'src/app/interfaces/expense-interface';
import { CommonService } from 'src/app/service/common.service';
import { TransactionService } from 'src/app/service/Transaction.service';
import { TransactionComponent } from '../transaction/transaction.component';

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
  spendings: any;

  constructor(public modalController: ModalController, public actionSheetController: ActionSheetController,
              public router: Router,private activatedroute: ActivatedRoute,
              private transactionService: TransactionService, private commonService: CommonService) { }

  async ngOnInit() {
    this.familyId = this.activatedroute.snapshot.paramMap.get('id');
    this.currentYear = await this.commonService.getCurrentYear();
    this.currentMonth = await this.commonService.getCurrentMonth();
    this.index = +this.commonService.getKeyFromMonth(this.currentMonth);
    this.getGroupedDataByType('Spending');

    // this.getTransactions(this.currentYear, this.index);
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



  backwards(){
    this.index = +this.commonService.getKeyFromMonth(this.currentMonth);
    if(+this.index ===1){
      this.index =12;
      this.currentYear = +this.currentYear-1;
    }else{
      this.index = this.index -1;
    }
    this.currentMonth = this.commonService.getAllMonths(this.index);
    this.spendings=[];
    console.log('Group data for ' + this.currentYear + ' ' + this.index);
    this.getGroupedDataByType('Spending');
  }

  forwards(){
    this.index = +this.commonService.getKeyFromMonth(this.currentMonth);
    if(+this.index ===12){
      this.index =1;
      this.currentYear = +this.currentYear+1;
    }else{
      this.index = this.index + 1;
    }
    this.currentMonth = this.commonService.getAllMonths(this.index);
    this.spendings=[];
    console.log('Group data for ' + this.currentYear + ' ' + this.index);
    this.getGroupedDataByType('Spending');
  }

  private getGroupedDataByType(type){
    this.transactionService.getGroupedData(this.familyId,this.currentYear,this.index,type)
    .subscribe(response =>{
      this.spendings = response;
    });
  }

}


