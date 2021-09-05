import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export abstract class SpinnerService {
  abstract simpleLoader(): void;
  abstract customLoader(meesage: string): void;
  abstract dismissLoader(): void;

}
