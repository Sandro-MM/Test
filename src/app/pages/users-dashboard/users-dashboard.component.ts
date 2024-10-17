import {ChangeDetectionStrategy, Component, inject, Signal} from '@angular/core';
import {TableComponentComponent} from '../../components/list-component/table-component.component';
import {DialogModule} from 'primeng/dialog';
import {UserProfile} from '../../shared/interfaces/profile.model';
import {UserProfileComponent} from '../../components/user-profile/user-profile.component';
import {ButtonModule} from 'primeng/button';
import {Router} from '@angular/router';
import {UsersDashboardService} from './users-dashboard.service';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {Message} from 'primeng/message';


@Component({
  selector: 'app-users-dashboard',
  standalone: true,
  imports: [
    TableComponentComponent,
    DialogModule,
    UserProfileComponent,
    ButtonModule,
    ProgressSpinnerModule,
    Message,
  ],
  providers: [UsersDashboardService],
  templateUrl: './users-dashboard.component.html',
  styleUrl: './users-dashboard.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersDashboardComponent {
  router = inject(Router);
  usersDashboardService = inject(UsersDashboardService);
  visible = false;
  columns: string[] = [
    "id",
    "firstName",
    "lastName",
    "pin",
    "address",
    "phoneNumber",
    "selectedGender",
    "profilePicture",
    "identifier"
  ];
  userData: UserProfile | null = null;
  isLoading: Signal<boolean> = this.usersDashboardService.isLoadingSelector;
  isError: Signal<string | null> = this.usersDashboardService.errorMessageSelector;
  usersList: Signal<UserProfile[] | undefined> = this.usersDashboardService.usersListSelector;
  totalRecords: Signal<number> = this.usersDashboardService.totalRecords;

  openProfile(event: UserProfile) {
    this.userData = event;
    this.visible = true;
  }

  editUser(userData: string) {
    this.router.navigate(['/manage-user', userData]);
  }

  addUser() {
    this.router.navigate(['/add-user']);
  }

  loadData(event: any) {
    console.log(event)
    const {first, rows, sortField, sortOrder, filters} = event;
    this.usersDashboardService.fetchUsers(first, rows, sortField, sortOrder, filters);
  }
}
