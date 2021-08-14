import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExpenseDashboardPage } from './expense-dashboard.page';

const routes: Routes = [
  {
    path: '',
    component: ExpenseDashboardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExpenseDashboardPageRoutingModule {}
