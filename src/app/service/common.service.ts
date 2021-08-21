import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Family, User } from '../interfaces/expense-interface';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
   months = {
    1:'Jan', 2:'Feb', 3: 'Mar', 4: 'Apr', 5: 'May', 6:'Jun', 7: 'Jul', 8: 'Aug', 9: 'Sep', 10: 'Oct', 11: 'Nov', 12: 'Dec'
  };
  getAllMonths(index){
    return this.months[index];
  }
  getKeyFromMonth(value){
    return Object.keys(this.months).find(k=>this.months[k]===value);
  }

  getCurrentMonth(){
    const date = new Date();
    return this.getAllMonths(date.getMonth()+1);
  }

  getCurrentYear(){
    return new Date().getFullYear();
  }
}
