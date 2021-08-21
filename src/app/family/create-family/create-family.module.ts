import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CreateFamilyPageRoutingModule } from './create-family-routing.module';
import { CreateFamilyPage } from './create-family.page';
import { AuthService } from 'src/app/service/auth.service';
import { AuthServiceImpl } from 'src/app/service/impl/auth.service.impl';
import { FamilyService } from 'src/app/service/family.service';
import { FamilyServiceImpl } from 'src/app/service/impl/family.service.impl';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateFamilyPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [CreateFamilyPage],
  providers: [
    { provide: AuthService, useClass: AuthServiceImpl },
    { provide: FamilyService, useClass: FamilyServiceImpl }
  ]
})
export class CreateFamilyPageModule {}
