import {Component, inject} from '@angular/core';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {ButtonModule} from 'primeng/button';
import {UserCredentialsComponent} from '../../components/user-credentials/user-credentials.component';
import {UserIdentifierComponent} from '../../components/user-identifier/user-identifier.component';
import {UserProfileInfoEditComponent} from '../../components/user-profile-info-edit/user-profile-info-edit.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [
    ButtonModule,
    ReactiveFormsModule,
    UserCredentialsComponent,
    UserIdentifierComponent,
    UserProfileInfoEditComponent
  ],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css'
})
export class AddUserComponent {
  router = inject(Router)
  newUserForm = new FormGroup({});

  onSubmit() {
    console.log(this.newUserForm)
  }

  navigateToDash() {
    this.router.navigate(['/dash']);
  }
}
