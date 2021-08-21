import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/service/auth.service';
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

  constructor(public modalController: ModalController, private fb: FormBuilder,
              private authService: AuthService, private transactionService: TransactionService) { }

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

  save(){
    const user = this.authService.userInfo();
    const date = new Date(this.form.get('date').value);
    const category =  this.form.get('category').value;
    const amount = this.form.get('amount').value;
    const userId = user['uid'];
    const type = this.type;
    const familyId = this.familyId;
    const obj ={userId,date,category,amount, type, familyId};
    this.transactionService.addTransaction(obj).then(res =>{
      this.dismissModal();
    });


  }

}
