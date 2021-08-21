import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Family, User } from '../interfaces/expense-interface';

@Injectable({
  providedIn: 'root'
})
export abstract class FamilyService {
  abstract createFamily(familyInfo: Family): Promise<any>;
  abstract getFamilies(email): Observable<any>;
}
