/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable prefer-const */
/* eslint-disable eqeqeq */
import { Category, Trend } from '../../interfaces/expense-interface';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { TrendService } from '../Trend.service';
import { forkJoin, Observable, of, pipe } from 'rxjs';
import { Cashflow } from 'src/app/common/cashflow';
import { map, take } from 'rxjs/operators';

@Injectable()
export class TrendServiceImpl implements TrendService {
  cashflowCollection = 'cashflow';
  constructor(private afStore: AngularFirestore) {
  }

  getCashflowTrends(familyId: string , type: string): Observable<any[]> {
    const baseYear = 2021;
    const maxYear = new Date().getFullYear();
    let currentMonth = new Date().getMonth();
    currentMonth = currentMonth +1;
    let maxMonth;
    let items = [];

    // this.test(familyId,type)

    for (let year = baseYear; year <= maxYear; year++) {
      maxMonth = (year !== maxYear) ? 12:currentMonth;
      for (let month = 1; month <= maxMonth; month++) {
        const totalsRef = this.getData(familyId, year,month , type);
        totalsRef.valueChanges().pipe(take(1)).subscribe(data => {
          let obj={} ;
          obj['name']= year + '-' + month;

          if( data == undefined){
            obj['value'] = 0;
          }else{
            obj['value'] = +data['total'];
          }
          items.push(obj);
        });
      }
    }

    return of(items);
  }


  test(familyId: string , type: string){
    const baseYear = 2021;
    const maxYear = new Date().getFullYear();
    let currentMonth = new Date().getMonth();
    currentMonth = currentMonth +1;
    let observableArray =[];
    let maxMonth;
    let index =0;
    for (let year = baseYear; year <= maxYear; year++) {
      maxMonth = (year !== maxYear) ? 12:currentMonth;
      for (let month = 1; month <= maxMonth; month++) {
        let ref = this.getData(familyId, year,month , type).valueChanges();
        observableArray[index]=ref;
        index = index+1;
      }
    }

    let joined$;
    for(let i =index;i>=0;i--){
      joined$ = forkJoin(observableArray[i]);
    }

    joined$.subscribe(console.log);

  }

  private getData(familyId,year, month, type){
    return this.afStore.collection(this.cashflowCollection)
          .doc(familyId)
          .collection(year.toString())
          .doc(month.toString())
          .collection('totals')
          .doc(type);

  }


}
