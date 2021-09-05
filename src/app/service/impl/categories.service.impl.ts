import { Category } from '../../interfaces/expense-interface';
import { Injectable } from '@angular/core';
import { CategoryService } from '../Category.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';

@Injectable()
export class CategoryServiceImpl implements CategoryService {
  config = 'config';
  categories = [];

  constructor(private afStore: AngularFirestore) {
  }
  getCategories(): Observable<any> {
    return this.afStore.collection(this.config).doc('cashflow').valueChanges();
  }

  addCategory(category: Category) {
    
  }



}
