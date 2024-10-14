import {Component} from '@angular/core';
import {TableComponentComponent} from '../../components/list-component/table-component.component';
import {DialogModule} from 'primeng/dialog';
import {UserProfile} from '../../interfaces/profile.model';
import {UserProfileComponent} from '../../components/user-profile/user-profile.component';


@Component({
  selector: 'app-users-dashboard',
  standalone: true,
  imports: [
    TableComponentComponent,
    DialogModule,
    UserProfileComponent,
  ],
  templateUrl: './users-dashboard.component.html',
  styleUrl: './users-dashboard.component.css'
})
export class UsersDashboardComponent {
  visible = false;
  userData:UserProfile | null = null;

  logRow(event: UserProfile) {
    this.userData = event;
    this.visible = true
  }
}
