import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { LoginPageRoutingModule } from './login-routing.module';
import { LoginPage } from './login.page';
import { AuthServiceImpl } from '../service/impl/auth.service.impl';
import { AuthService } from '../service/auth.service';
import { SpinnerServiceImpl } from '../service/impl/Spinner.service.impl';
import { SpinnerService } from '../service/Spinner.service';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [LoginPage],
  providers: [
    { provide: AuthService, useClass: AuthServiceImpl },
    { provide: SpinnerService, useClass: SpinnerServiceImpl}
  ]
})
export class LoginPageModule {}
