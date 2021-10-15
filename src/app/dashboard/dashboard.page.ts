import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Family } from '../interfaces/expense-interface';
import { AuthService } from '../service/auth.service';
import { FamilyService } from '../service/family.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  imageCollection = [
    {
      url: '../../assets/icon/money-bag.png',
      title: 'Expense Tracker',
      path: '/dashboard/expense-dashboard'
    },
    {
      url: '../../assets/icon/expense.jpg',
      title: 'Cashflow Trend',
      path: '/dashboard/cashflow-trend'
    }

  ];

  userInfo$: Observable<any>;
  families$: Observable<Family[]>;

  constructor(private router: Router, public authService: AuthService,private familyService: FamilyService) { }

  ngOnInit() {
    this.userInfo$ = this.authService.getMyDetails();
    this.userInfo$.subscribe(userData =>{
      this.families$ = this.familyService.getFamilies(userData.email);
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

}
