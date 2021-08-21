import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export abstract class TransactionService {
  abstract addTransaction(transaction): Promise<any>;
  abstract filterTransaction(familyId,type, year, month): Observable<any>;
  abstract getGroupedData(familyId,year,month,type): Observable<any>;
}
