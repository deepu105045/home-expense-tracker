import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../interfaces/expense-interface';


@Injectable({
  providedIn: 'root'
})
export abstract class CategoryService {
  abstract addCategory(category: Category);
  abstract getCategories(): Observable<any>;

}
