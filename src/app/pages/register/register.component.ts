import {ChangeDetectionStrategy, Component, effect, inject, Signal} from '@angular/core';
import {ButtonModule} from 'primeng/button';
import {FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {UserCredentialsComponent} from '../../components/user-credentials/user-credentials.component';
import {ManageUserComponent} from '../manage-user/manage-user.component';
import {UserIdentifierComponent} from '../../components/user-identifier/user-identifier.component';
import {UserProfileInfoEditComponent} from '../../components/user-profile-info-edit/user-profile-info-edit.component';
import {Router} from '@angular/router';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {RegisterService} from './register.service';
import {UserRegister} from '../../shared/interfaces/register.model';
import {MessageService} from 'primeng/api';
import {ToastModule} from 'primeng/toast';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ButtonModule,
    FormsModule,
    UserCredentialsComponent,
    ReactiveFormsModule,
    ManageUserComponent,
    UserIdentifierComponent,
    UserProfileInfoEditComponent,
    ProgressSpinnerModule,
    ToastModule,
  ],
  providers: [RegisterService],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterComponent {
  router = inject(Router)
  registerService = inject(RegisterService)
  messageService = inject(MessageService)
  isLoading: Signal<boolean> = this.registerService.isLoadingSelector
  responseStatus: Signal<boolean> = this.registerService.responseSelector
  isError: Signal<string | null> = this.registerService.errorMessageSelector
  registerForm = new FormGroup({});

  constructor() {
    effect(() => {
      const response = this.responseStatus();
      const error = this.isError();
      if (response) {
        this.messageService.add({severity: 'success', summary: 'Success', detail: 'Register success'});
        this.router.navigate(['/dash']);
      }
      if (error) {
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'Register Error'});
      }
    });
  }

  onSubmit(): void {
    const userData = this.registerForm.value as UserRegister;
    this.registerService.registerUser(userData)
    console.log(this.registerForm.value);
  }


  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}
