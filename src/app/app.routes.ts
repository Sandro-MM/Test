import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'edit-profile',
    loadComponent: () => import('./pages/manage-user/manage-user.component').then(m => m.ManageUserComponent)
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: '**',
    redirectTo: 'edit-profile'
  }
];

