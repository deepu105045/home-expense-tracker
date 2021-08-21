import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Family, Transaction, User } from '../../interfaces/expense-interface';
import { AngularFirestore, DocumentData } from '@angular/fire/firestore';
import firebase from 'firebase/app';
import { FamilyService } from '../family.service';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { TransactionService } from '../Transaction.service';

@Injectable()
export class TransactionServiceImpl implements TransactionService {

  cashflowCollection = 'cashflow';
  groupedCollection= 'grouped';
  groupedData: [];
  constructor(public ngFireAuth: AngularFireAuth,private afStore: AngularFirestore){

  }

  addTransaction(transaction: Transaction) {
    const familyId = transaction.familyId;
    const year =transaction.date.getFullYear();
    const month = transaction.date.getMonth()+1;

    const ref = this.familyRef(familyId,year,month);
    return ref.collection('transactions').add(transaction)
              .then(response =>{
                this.groupExpense(familyId,year,month,transaction);
                });
  }

  filterTransaction(familyId,type, year, month): Observable<DocumentData[]>{
    month = ('0' + month).slice(-2);
    const yearMonth = year+'-'+month;
    return this.afStore.collection(this.cashflowCollection).doc(familyId)
                .collection('transactions', ref =>
                    ref.where('type', '==', type)
                       .where('date','>=',yearMonth +'-12T00:00:00.000+05:30')
                       .where('date','<=',yearMonth+ '-31T00:00:00.000+05:30')
                       .orderBy('date', 'asc'))
                .valueChanges();
  }

  public getGroupedData(familyId,year,month,type): Observable<any>{
    return this.groupRef(familyId, year, month, type).valueChanges();
  }

  private groupExpense(familyId,year,month,transaction){
    const type = transaction.type;
    this.groupRef(familyId,year,month,type).valueChanges().pipe(take(1)).subscribe(response =>{
      if(response){
        const category =transaction.category;
        const amount: number = response[transaction.category] ?response[transaction.category] :0;
        const newAmount = amount + transaction.amount;
        const obj = {[category]: newAmount};
        return this.groupRef(familyId,year,month,type).update(obj);
      }else{
        const category =transaction.category;
        const newAmount =transaction.amount;
        const obj = {[category]: newAmount};
        return this.groupRef(familyId,year,month,type).set(obj);
      }
    });
  }


  private familyRef(familyId,currentYear,currentMonth){
    return this.afStore.collection(this.cashflowCollection)
              .doc(familyId)
              .collection(currentYear.toString())
              .doc(currentMonth.toString());
  }

  private groupRef(familyId,year,month,type){
    return this.afStore.collection(this.cashflowCollection)
              .doc(familyId)
              .collection(year.toString())
              .doc(month.toString())
              .collection('grouped')
              .doc(type);
  }

}

