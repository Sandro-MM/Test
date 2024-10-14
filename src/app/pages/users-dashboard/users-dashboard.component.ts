import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {TableComponentComponent} from '../../components/list-component/table-component.component';
import {DialogModule} from 'primeng/dialog';
import {UserProfile} from '../../interfaces/profile.model';
import {UserProfileComponent} from '../../components/user-profile/user-profile.component';
import {ButtonModule} from 'primeng/button';
import {Router} from '@angular/router';


@Component({
  selector: 'app-users-dashboard',
  standalone: true,
  imports: [
    TableComponentComponent,
    DialogModule,
    UserProfileComponent,
    ButtonModule,
  ],
  templateUrl: './users-dashboard.component.html',
  styleUrl: './users-dashboard.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersDashboardComponent {
  router = inject(Router)
  visible = false;
  userData:UserProfile | null = null;

  logRow(event: UserProfile) {
    this.userData = event;
    this.visible = true
  }

  editUser(userData: string) {
    this.router.navigate(['/manage-user', userData]);
  }

  addUser() {
    this.router.navigate(['/add-user']);
  }
}
