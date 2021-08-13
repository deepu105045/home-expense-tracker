import { Injectable } from '@angular/core';
import { LoginService } from '../login.service';

@Injectable()
export class LoginServiceImpl implements LoginService {
  login(username: any, password: any): boolean {
    console.log('Username :: ' + username);
    console.log('Password :: ' + password);
    return true;
  }

}
