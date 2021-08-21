import { Injectable } from '@angular/core';
import { User } from '../interfaces/expense-interface';

@Injectable({
  providedIn: 'root'
})
export abstract class AuthService {
  abstract login(username,password): Promise<any> ;
  abstract registerUser(user: User): Promise<any> ;
  abstract logout(): void;
  abstract isLoggedIn(): boolean;
  abstract userInfo(): Promise<any>;

}
