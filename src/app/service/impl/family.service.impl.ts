import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Family, User } from '../../interfaces/expense-interface';
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from 'firebase/app';
import { FamilyService } from '../family.service';
import { Observable } from 'rxjs';

@Injectable()
export class FamilyServiceImpl implements FamilyService {

  familyCollection = 'family';
  constructor(public ngFireAuth: AngularFireAuth,private afStore: AngularFirestore){}


  createFamily(familyInfo: Family): Promise<any> {
    const familyId = this.afStore.createId();
    familyInfo.familyid = familyId;
    return this.afStore.collection(this.familyCollection).doc(familyId)
              .set(familyInfo);
  }

  getFamilies(email): Observable<any>{
    console.log('Getting families for email :: ' + email)
    return this.afStore.collection(this.familyCollection, ref =>
       ref.where('members','array-contains',email))
       .valueChanges();
  }
}
