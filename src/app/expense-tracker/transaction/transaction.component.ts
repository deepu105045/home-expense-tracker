/* eslint-disable @typescript-eslint/dot-notation */
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/service/auth.service';
import { CategoryService } from 'src/app/service/Category.service';
import { TransactionService } from 'src/app/service/Transaction.service';
@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss'],
})
export class TransactionComponent implements OnInit {

  @Input() type: string;
  @Input() familyId: string;
  form: any;
  userId: string;
  category: string;

  constructor(public modalController: ModalController, private fb: FormBuilder,
              private authService: AuthService, private transactionService: TransactionService,
              private categoryService: CategoryService) { }

  ngOnInit() {
    this.form = this.fb.group({
      date:[new Date().toISOString()],
      category:[''],
      amount:[''],
      note:['']
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

  async save(){
    const user$ = this.authService.getMyDetails();
    user$.subscribe(userInfo =>{
      this.userId = userInfo.uid;
    });
    const date = new Date(this.form.get('date').value);
    const category =this.category;
    const amount = this.form.get('amount').value;
    const userId = this.userId;
    const type = this.type;
    const familyId = this.familyId;
    const notes = this.form.get('note').value;
    const obj ={userId,date,category,amount, type, familyId,notes};
    const categoryObj = {name:category};
    this.transactionService.addTransaction(obj).then(res =>{
      this.categoryService.addCategory(categoryObj);
      this.categoryService.getCategories();
      this.dismissModal();
    });
  }

  addItem(event){
    this.category = event;
  }

}
