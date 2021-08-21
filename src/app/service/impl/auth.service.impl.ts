import { AngularFireAuth } from '@angular/fire/auth';
import { User } from '../../interfaces/expense-interface';
import { AuthService } from '../auth.service';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import firebase from 'firebase/app';

@Injectable()
export class AuthServiceImpl implements AuthService {
  user='user';
  userData: any;
  user$: Observable<firebase.User>;
  constructor( public afStore: AngularFirestore,public ngFireAuth: AngularFireAuth,public router: Router,
               public ngZone: NgZone ) {
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
  }


  registerUser(user: User): Promise<any>{
    return this.ngFireAuth.createUserWithEmailAndPassword(user.email, user.password).then(response =>{
      response.user.updateProfile({
        displayName: user.name
      });
      return Promise.resolve(user.name);
    });
  }

  login(username: any, password: any): Promise<any> {
    return this.ngFireAuth.signInWithEmailAndPassword(username, password);
  }

  logout() {
    return this.ngFireAuth.signOut().then(() => {
      localStorage.removeItem(this.user);
    });
  }

  isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem(this.user));
    return (user !== null) ? true : false;
  }

   userInfo() {
    return JSON.parse(localStorage.getItem(this.user));
  }


}
