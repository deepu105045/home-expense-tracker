import { AngularFireAuth } from '@angular/fire/auth';
import { User } from '../../interfaces/expense-interface';
import { AuthService } from '../auth.service';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable,of,from } from 'rxjs';
import firebase from 'firebase/app';

@Injectable()
export class AuthServiceImpl implements AuthService {
  user='user';
  userData: any;
  user$: Observable<firebase.User>;
  constructor( public afStore: AngularFirestore,public ngFireAuth: AngularFireAuth,public router: Router,public ngZone: NgZone ) {
    this.setLocalStorage();
  }

  async setLocalStorage(){
    await new Promise(f => setTimeout(f, 1000));
    this.user$ = this.ngFireAuth.authState;
    this.ngFireAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem(this.user, JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem(this.user));
      } else {
        localStorage.setItem(this.user, null);
        JSON.parse(localStorage.getItem(this.user));
      }
    });
    await new Promise(f => setTimeout(f, 1000));

  }

  async registerUser(user: User): Promise<any>{
     return this.ngFireAuth.createUserWithEmailAndPassword(user.email, user.password).then(async response =>{
      response.user.updateProfile({
        displayName: user.name
      });
      await this.setLocalStorage();
      return Promise.resolve(user.name);
    });
  }

  async login(username: any, password: any): Promise<firebase.auth.UserCredential> {
    const data =await this.ngFireAuth.signInWithEmailAndPassword(username, password);
    await this.setLocalStorage();
    return data;
  }

  logout() {
    return this.ngFireAuth.signOut().then(() => {
      localStorage.removeItem(this.user);
    });
  }

  getMyDetails(): Observable<User>{
   return of(JSON.parse(localStorage.getItem(this.user)));
  }


}
