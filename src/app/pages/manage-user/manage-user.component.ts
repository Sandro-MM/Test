import {Component, inject, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, ReactiveFormsModule, FormArray, FormControl} from '@angular/forms';
import {UserProfileInfoEditComponent} from '../../components/user-profile-info-edit/user-profile-info-edit.component';
import {UserIdentifierComponent} from '../../components/user-identifier/user-identifier.component';
import {ButtonModule } from 'primeng/button';
import {ActivatedRoute, Router} from '@angular/router';
import {UserProfile} from '../../interfaces/profile.model';

@Component({
  selector: 'app-manage-user',
  standalone: true,
  imports: [ReactiveFormsModule, UserProfileInfoEditComponent, UserIdentifierComponent, ButtonModule],
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.css']
})
export class ManageUserComponent implements OnInit {
  route= inject(ActivatedRoute)
  router= inject(Router)
  manageUserForm = new FormGroup({});
  userIdentifier!: string;
  data:UserProfile = {
    "firstName": "Sandro",
    "lastName": "Martiashvili",
    "pin": "44444444444",
    "address": "Digomi Massive",
    "phoneNumber": "568224554",
    "selectedGender": "Man",
    "profilePicture": "value"
  }
  ngOnInit(): void {
    this.getUser()
  }
  getUser(){
    this.route.paramMap.subscribe(params => {
      this.userIdentifier = params.get('userIdentifier') || '';
    });
  }
  onSubmit() {
   console.log(this.manageUserForm)
  }
  get submitDisabled() {
    return this.manageUserForm.invalid
  }
  navigateToDash() {
    this.router.navigate(['/dash']);
  }
}
