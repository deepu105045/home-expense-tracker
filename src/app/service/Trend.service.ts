import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Trend } from '../interfaces/expense-interface';

@Injectable({
  providedIn: 'root'
})
export abstract class TrendService {
  abstract getCashflowTrends(familyId: string , type: string): Observable<any[]>;


}
