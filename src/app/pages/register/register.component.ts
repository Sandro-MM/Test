import {Component, inject} from '@angular/core';
import {Button} from 'primeng/button';
import {FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {UserCredentialsComponent} from '../../components/user-credentials/user-credentials.component';
import {ManageUserComponent} from '../manage-user/manage-user.component';
import {UserIdentifierComponent} from '../../components/user-identifier/user-identifier.component';
import {UserProfileInfoEditComponent} from '../../components/user-profile-info-edit/user-profile-info-edit.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    Button,
    FormsModule,
    UserCredentialsComponent,
    ReactiveFormsModule,
    ManageUserComponent,
    UserIdentifierComponent,
    UserProfileInfoEditComponent
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  router = inject(Router)
  registerForm = new FormGroup({});
  ngOnInit(): void {
  }
  onSubmit(): void {
    console.log(this.registerForm.value);
  }

  navigateToLogin() {
    this.router.navigate(['/login']);

  }
}
