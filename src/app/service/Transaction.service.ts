import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Transaction } from '../interfaces/expense-interface';

@Injectable({
  providedIn: 'root'
})
export abstract class TransactionService {
  abstract addTransaction(transaction): Promise<any>;
  abstract filterTransaction(familyId,type, year, month): Observable<any>;
  abstract getGroupedData(familyId,year,month,type): Observable<any>;
  abstract getTotals(familyId,year,month,type): Observable<any>;
  abstract viewTransactions(familyId,year,month): Observable<Transaction[]>;
}
