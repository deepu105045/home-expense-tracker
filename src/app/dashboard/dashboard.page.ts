import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  ImageCollection = [
    {
      url: '../../assets/icon/money-bag.png',
      title: 'Expense Tracker',
      path: '/dashboard/expense-dashboard'
    },
    {
      url: '../../assets/icon/fruit.png',
      title: 'Grocery Shopping'
    },
    {
      url: '../../assets/icon/diary1.png',
      title: 'Diary'
    },
    {
      url: '../../assets/icon/do-it-now.png',
      title: 'Tasks'
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
