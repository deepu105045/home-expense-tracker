import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RegisterPageRoutingModule } from './register-routing.module';
import { RegisterPage } from './register.page';
import { AuthServiceImpl } from '../service/impl/auth.service.impl';
import { AuthService } from '../service/auth.service';
import { FamilyService } from '../service/family.service';
import { FamilyServiceImpl } from '../service/impl/family.service.impl';
import { SpinnerServiceImpl } from '../service/impl/Spinner.service.impl';
import { SpinnerService } from '../service/Spinner.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegisterPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [RegisterPage],
  providers: [
    { provide: AuthService, useClass: AuthServiceImpl },
    { provide: FamilyService, useClass: FamilyServiceImpl},
    { provide: SpinnerService, useClass: SpinnerServiceImpl}
  ]
})
export class RegisterPageModule {}
