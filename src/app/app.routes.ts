import { Routes } from '@angular/router';
import {AuthGuard} from './shared/guards/auth-guard.guard';



export const routes: Routes = [
  {
    path: 'manage-user/:identifier',
    loadComponent: () => import('./pages/manage-user/manage-user.component').then(m => m.ManageUserComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/register/register.component').then(m => m.RegisterComponent)
  },
  {
    path: 'add-user',
    loadComponent: () => import('./pages/add-user/add-user.component').then(m => m.AddUserComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'dash',
    loadComponent: () => import('./pages/users-dashboard/users-dashboard.component').then(m => m.UsersDashboardComponent),
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];

