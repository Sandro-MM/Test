import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import {UsersDashboardService} from '../pages/users-dashboard/users-dashboard.service';

export const userListResolver: ResolveFn<any> = (route, state) => {
  // const userService = inject(UsersDashboardService);
  // return userService.fetchUsers()
};
