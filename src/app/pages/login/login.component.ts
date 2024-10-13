import { Component } from '@angular/core';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {UserCredentialsComponent} from '../../components/user-credentials/user-credentials.component';
import {Button} from 'primeng/button';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    UserCredentialsComponent,
    Button
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm = new FormGroup({

  });
  ngOnInit(): void {
  }

  onSubmit(): void {
    console.log(this.loginForm.value);
  }
}
