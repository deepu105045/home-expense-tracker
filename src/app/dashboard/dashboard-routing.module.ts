import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardPage } from './dashboard.page';

const routes: Routes = [
  {
    path: '',
    component: DashboardPage
  },
  {
    path: 'expense-dashboard/:id',
    loadChildren: () => import('../expense-tracker/expense-dashboard/expense-dashboard.module').then( m => m.ExpenseDashboardPageModule)
  },
  {
    path: 'cashflow-trend/:id',
    loadChildren: () => import('../expense-tracker/trend/trend.module').then( m => m.TrendPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardPageRoutingModule {}
