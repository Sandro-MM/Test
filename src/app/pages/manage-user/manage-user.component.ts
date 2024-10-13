import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, ReactiveFormsModule, FormArray, FormControl} from '@angular/forms';
import {UserProfileInfoComponent} from '../../components/user-profile-info/user-profile-info.component';
import {UserIdentifierComponent} from '../../components/user-identifier/user-identifier.component';
import {Button} from 'primeng/button';

@Component({
  selector: 'app-manage-user',
  standalone: true,
  imports: [ReactiveFormsModule, UserProfileInfoComponent, UserIdentifierComponent, Button],
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.css']
})
export class ManageUserComponent implements OnInit {
  manageUserForm = new FormGroup({});
  ngOnInit(): void {
  }




  onSubmit() {
   console.log(this.manageUserForm)
  }

  get submitDissabled() {
    return this.manageUserForm.invalid
  }
}
