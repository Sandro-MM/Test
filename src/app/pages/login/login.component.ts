import {ChangeDetectionStrategy, Component, effect, inject, Signal} from '@angular/core';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {UserCredentialsComponent} from '../../components/user-credentials/user-credentials.component';
import {ButtonModule } from 'primeng/button';
import {Router} from '@angular/router';
import {LoginService} from './login.service';
import {UserLogin} from '../../interfaces/login.model';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    UserCredentialsComponent,
    ButtonModule,
    ProgressSpinnerModule
  ],
  providers:[MessageService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {
  router = inject(Router);
  loginService = inject(LoginService);
  messageService  = inject(MessageService)
  isLoading:Signal<boolean> = this.loginService.isLoadingSelector;
  responseStatus:Signal<boolean> = this.loginService.responseSelector
  isError:Signal<string | null> = this.loginService.errorMessageSelector;
  loginForm = new FormGroup({});

  constructor() {
    effect(() => {
      const response = this.responseStatus();
      if (response) {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Login success' });
        this.router.navigate(['/dash']);
      }
    });
  }

  onSubmit(): void {
    const userData = this.loginForm.get('credentials')?.value! as UserLogin;
    this.loginService.loginUser(userData)
    console.log(userData);
  }

  navigateToRegister() {
    this.router.navigate(['/register']);
  }
}
