import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  navigate: any;
  constructor(private platform: Platform) {
    this.sideMenu();
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // this.statusBar.styleDefault();
      // this.splashScreen.hide();
    });
  }

  sideMenu()
  {
    this.navigate =
    [
      {
        title : 'Home',
        url   : '/home',
        icon  : 'home'
      },
      {
        title : 'Exepense-Tracker',
        url   : '/chat',
        icon  : 'analytics-outline'
      },
      {
        title : 'About',
        url   : '/about',
        icon  : 'call-outline'
      },
      {
        title : 'Signout',
        url   : 'log-out-outline',
        icon  : 'contacts'
      },
    ];
  }
}
