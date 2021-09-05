
import { Injectable } from '@angular/core';
import { SpinnerService } from '../Spinner.service';
import { LoadingController } from '@ionic/angular';

@Injectable()
export class SpinnerServiceImpl implements SpinnerService {
  constructor(public loadingController: LoadingController) {

  }
  customLoader(meesage: string): void {
    this.loadingController.create({
      message: meesage
    }).then((response) => {
      response.present();
    });
  }
  simpleLoader(): void {
    this.loadingController.create({
      message: 'Loading...'
    }).then((response) => {
      response.present();
    });
  }

  dismissLoader() {
    this.loadingController.dismiss().then((response) => {
      console.log('Loader closed!', response);
    }).catch((err) => {
      console.log('Error occured : ', err);
    });
  }




}
