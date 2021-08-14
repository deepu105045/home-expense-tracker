import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service';
import { AngularFireAuth } from '@angular/fire/auth';


@Injectable()
export class AuthServiceImpl implements AuthService {

  constructor(public ngFireAuth: AngularFireAuth){

  }
  login(username: any, password: any): Promise<any> {
    console.log('Username :: ' + username);
    console.log('Password :: ' + password);
    return this.ngFireAuth.signInWithEmailAndPassword(username, password);
  }


}
