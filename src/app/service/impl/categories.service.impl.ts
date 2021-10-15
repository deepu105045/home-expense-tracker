import { Category } from '../../interfaces/expense-interface';
import { Injectable } from '@angular/core';
import { CategoryService } from '../Category.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import firebase from 'firebase/app';


@Injectable()
export class CategoryServiceImpl implements CategoryService {
  config = 'config';
  cashflowDoc = 'cashflow';
  categories = [];

  constructor(private afStore: AngularFirestore) {
  }
  getCategories(): Observable<any> {
    return this.afStore.collection(this.config).doc(this.cashflowDoc).valueChanges();
  }

  addCategory(category: Category) {
    const ref = this.afStore.collection(this.config).doc(this.cashflowDoc);
    ref.update(
      {
        categories: firebase.firestore.FieldValue.arrayUnion(category.name)
      }
    );
  }



}
