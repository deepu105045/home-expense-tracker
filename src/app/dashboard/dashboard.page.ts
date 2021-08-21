import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
      url: '../../assets/icon/fruit.png',
      title: 'Grocery Shopping'
    },
    // {
    //   url: '../../assets/icon/diary1.png',
    //   title: 'Diary'
    // },
    // {
    //   url: '../../assets/icon/do-it-now.png',
    //   title: 'Tasks'
    // }
  ];
  displayName: string;
  userData: any;
  myemail: any;
  families: any;

  constructor(private route: ActivatedRoute, private router: Router, private authService: AuthService,
              private familyService: FamilyService) { }

  ngOnInit() {
    this.displayName = this.route.snapshot.queryParamMap.get('displayName');
    this.userData = this.authService.userInfo();
    this.myemail = this.userData.email;
    this.familyService.getFamilies(this.myemail).subscribe(familyInfo =>{
      if(familyInfo.length === 0){
        this.router.navigate(['create-family']);
      }else{
        this.families = familyInfo;
      }
    });

  }

  logout(){
    this.authService.logout();
    this.router.navigate(['/']);
  }

}
