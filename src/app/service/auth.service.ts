import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interfaces/expense-interface';

@Injectable({
  providedIn: 'root'
})
export abstract class AuthService {
  abstract login(username: string,password: string): Promise<any> ;
  abstract registerUser(user: User): Promise<any> ;
  abstract logout(): void;
  abstract getMyDetails(): Observable<User>;

}
