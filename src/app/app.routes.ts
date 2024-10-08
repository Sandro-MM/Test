import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'edit-profile',
    loadComponent: () => import('./pages/user-profile-edit/user-profile-edit.component').then(m => m.UserProfileEditComponent)
  },
  {
    path: '**',
    redirectTo: 'edit-profile'
  }
];

