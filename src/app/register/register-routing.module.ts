import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { AuthServiceImpl } from '../service/impl/auth.service.impl';

import { RegisterPage } from './register.page';

const routes: Routes = [
  {
    path: '',
    component: RegisterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    { provide: AuthService, useClass: AuthServiceImpl }
  ]
})
export class RegisterPageRoutingModule {}
