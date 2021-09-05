import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Transaction } from '../../interfaces/expense-interface';
import { AngularFirestore, DocumentData } from '@angular/fire/firestore';
import firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { TransactionService } from '../Transaction.service';
import { Cashflow } from 'src/app/common/cashflow';

@Injectable()
export class TransactionServiceImpl implements TransactionService {

  cashflowCollection = 'cashflow';
  configCollection = 'config';
  groupedCollection= 'stats';
  transactioCollection ='transactions';
  totalsCollection = 'totals';
  categoriesDoc ='categories';

  groupedData: [];
  constructor(public ngFireAuth: AngularFireAuth,private afStore: AngularFirestore){
  }
  viewTransactions(familyId: string, year: string, month: string): Observable<any> {
    const ref = this.familyRef(familyId,year,month);
    return ref.collection(this.transactioCollection).valueChanges();
  }


  getTotals(familyId: any, year: any, month: any, type: any): Observable<any>{
    return this.totalsRef(familyId, year, month, type).valueChanges();
  }

  async addTransaction(transaction: Transaction) {
    const familyId = transaction.familyId;
    const year =transaction.date.getFullYear();
    const month = transaction.date.getMonth()+1;
    const ref = this.familyRef(familyId,year,month);

    await ref.collection(this.transactioCollection).add(transaction);
    await this.groupExpense(familyId,year,month,transaction);
    await this.updateTotals(familyId,year,month,transaction);

  }

  async updateTotals( familyId,year,month,transaction: Transaction){
    const increment = await firebase.firestore.FieldValue.increment(transaction.amount);
    const totalsRef = await this.totalsRef(familyId, year, month, transaction.type);
    totalsRef.set({ total: increment },{ merge: true });
    let amount = 0.0;
    if((transaction.type === Cashflow.SPENDING) || (transaction.type === Cashflow.INVESTMENT)){
      amount =transaction.amount *(-1);
    }else if(transaction.type === Cashflow.INCOME){
      amount =transaction.amount;
    }
    const balance = await firebase.firestore.FieldValue.increment(amount);
    const totalsBalanceRef = await this.totalsRef(familyId, year, month, Cashflow.BALANCE);
    totalsBalanceRef.set({ total: balance },{ merge: true });

  }



  updateCategory(category,type){
   const ref = this.afStore.collection(this.configCollection).doc(this.categoriesDoc).collection(type).add({categoty: category});
  }

  filterTransaction(familyId,type, year, month): Observable<DocumentData[]>{
    month = ('0' + month).slice(-2);
    const yearMonth = year+'-'+month;
    return this.afStore.collection(this.cashflowCollection).doc(familyId)
                .collection(this.transactioCollection, ref =>
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
        const category =this.capitalize(transaction.category.toLowerCase());
        const amount: number = response[category] ?response[category] :0;
        const newAmount = amount + transaction.amount;
        const obj = {[category]: newAmount};
        return this.groupRef(familyId,year,month,type).update(obj);
      }else{
        const category =this.capitalize(transaction.category.toLowerCase());
        const newAmount =transaction.amount;
        const obj = {[category]: newAmount};
        return this.groupRef(familyId,year,month,type).set(obj);
      }
    });
  }

  private capitalize(text){
    const textCapitalized= text.charAt(0).toUpperCase() + text.slice(1);
    return textCapitalized;
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
              .collection(this.groupedCollection)
              .doc(type);
  }

  private totalsRef(familyId,year,month,type){
    return this.afStore.collection(this.cashflowCollection)
              .doc(familyId)
              .collection(year.toString())
              .doc(month.toString())
              .collection(this.totalsCollection)
              .doc(type);
  }

}

