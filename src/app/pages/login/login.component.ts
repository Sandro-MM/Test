import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {UserCredentialsComponent} from '../../components/user-credentials/user-credentials.component';
import {ButtonModule } from 'primeng/button';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    UserCredentialsComponent,
    ButtonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {
  router = inject(Router)
  loginForm = new FormGroup({

  });
  ngOnInit(): void {
  }

  onSubmit(): void {
    console.log(this.loginForm.value);
  }

  navigateToRegister() {
    this.router.navigate(['/register']);
  }
}
