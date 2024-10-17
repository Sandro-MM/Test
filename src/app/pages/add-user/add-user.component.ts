import {ChangeDetectionStrategy, Component, effect, inject, Signal} from '@angular/core';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {ButtonModule} from 'primeng/button';
import {UserCredentialsComponent} from '../../components/user-credentials/user-credentials.component';
import {UserIdentifierComponent} from '../../components/user-identifier/user-identifier.component';
import {UserProfileInfoEditComponent} from '../../components/user-profile-info-edit/user-profile-info-edit.component';
import {Router} from '@angular/router';
import {AddUserService} from './add-user.service';
import {UserProfile} from '../../interfaces/profile.model';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [
    ButtonModule,
    ReactiveFormsModule,
    UserCredentialsComponent,
    UserIdentifierComponent,
    UserProfileInfoEditComponent,
    ProgressSpinnerModule
  ],
  providers: [AddUserService],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddUserComponent {
  addUserService = inject(AddUserService)
  router = inject(Router)
  messageService = inject(MessageService)
  newUserForm = new FormGroup({});

  isLoading: Signal<boolean> = this.addUserService.isLoadingSelector
  responseStatus: Signal<boolean> = this.addUserService.responseSelector
  isError: Signal<string | null> = this.addUserService.errorMessageSelector

  constructor() {
    effect(() => {
      const response = this.responseStatus();
      const error = this.isError();
      if (response) {
        this.messageService.add({severity: 'success', summary: 'Success', detail: 'User Added'});
        this.router.navigate(['/dash']);
      }
      if (error) {
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'User Add Error'});
      }
    });
  }

  onSubmit() {
    const personalInfo = this.newUserForm.get('personalInfo')?.value! as UserProfile;
    const data: UserProfile = {
      ...personalInfo,
      identifier: this.newUserForm.get('identifier')?.value
    }
    this.addUserService.addUser(data)
  }

  navigateToDash() {
    this.router.navigate(['/dash']);
  }
}
