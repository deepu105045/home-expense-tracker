import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export abstract class AuthService {
  abstract login(username,password): Promise<any> ;
}
