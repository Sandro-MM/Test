import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, ReactiveFormsModule, FormArray, FormControl} from '@angular/forms';
import {UserProfileInfoEditComponent} from '../../components/user-profile-info-edit/user-profile-info-edit.component';
import {UserIdentifierComponent} from '../../components/user-identifier/user-identifier.component';
import {Button} from 'primeng/button';

@Component({
  selector: 'app-manage-user',
  standalone: true,
  imports: [ReactiveFormsModule, UserProfileInfoEditComponent, UserIdentifierComponent, Button],
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
