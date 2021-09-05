import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  {
    path: '',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then( m => m.DashboardPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'create-family',
    loadChildren: () => import('./family/create-family/create-family.module').then( m => m.CreateFamilyPageModule)
  },
  {
    path: 'add-members',
    loadChildren: () => import('./family/add-members/add-members.module').then( m => m.AddMembersPageModule)
  },
  {
    path: 'view-transactions',
    loadChildren: () => import('./expense-tracker/view-transactions/view-transactions.module').then( m => m.ViewTransactionsPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
