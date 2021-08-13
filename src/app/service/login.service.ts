import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export abstract class LoginService {
  abstract login(username, password): boolean;
}
