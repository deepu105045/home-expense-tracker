import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateFamilyPage } from './create-family.page';

const routes: Routes = [
  {
    path: '',
    component: CreateFamilyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateFamilyPageRoutingModule {}
