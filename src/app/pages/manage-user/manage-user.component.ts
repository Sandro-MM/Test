import {ChangeDetectionStrategy, Component, effect, inject, OnInit, Signal} from '@angular/core';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {UserProfileInfoEditComponent} from '../../components/user-profile-info-edit/user-profile-info-edit.component';
import {UserIdentifierComponent} from '../../components/user-identifier/user-identifier.component';
import {ButtonModule } from 'primeng/button';
import {ActivatedRoute, Router} from '@angular/router';
import {UserProfile} from '../../interfaces/profile.model';
import {ChipModule} from 'primeng/chip';
import {ManageUserService} from './manage-user.service';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {MessageService} from 'primeng/api';
@Component({
  selector: 'app-manage-user',
  standalone: true,
  imports: [ReactiveFormsModule, UserProfileInfoEditComponent, UserIdentifierComponent, ButtonModule, ChipModule, ProgressSpinnerModule],
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.css'],
  providers:[ManageUserService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ManageUserComponent implements OnInit {
  route= inject(ActivatedRoute)
  router= inject(Router)
  messageService= inject(MessageService)
  manageUserService= inject(ManageUserService)
  isLoading: Signal<boolean> = this.manageUserService.isLoadingSelector;
  isError: Signal<string | null> = this.manageUserService.errorMessageSelector;
  user: Signal<UserProfile | undefined> = this.manageUserService.userSelector;
  response: Signal<string> = this.manageUserService.responseSelector;
  manageUserForm = new FormGroup({});
  userIdentifier!: string;

  constructor() {
    effect(() => {
      const response = this.response();
      const error = this.isError();
      if (response == "deleted") {
        this.messageService.add({ severity: 'warn', summary: 'Delete', detail: 'User Deleted' });
        this.router.navigate(['/dash']);
      }
      if (response == "edited") {
        this.messageService.add({ severity: 'success', summary: 'Update', detail: 'User Edited' });
        this.router.navigate(['/dash']);
      }
      if (error) {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error' });
      }
    });
  }



  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.userIdentifier = params.get('identifier') || '';
    });
    this.getUser()
  }


  getUser(){

    this.manageUserService.fetchUser(this.userIdentifier)
  }

  delUser(){
    this.manageUserService.deleteUser(this.userIdentifier)
  }
  onSubmit() {
    const userData = this.manageUserForm.get('personalInfo')?.value;
    const data = userData! as UserProfile;
    this.manageUserService.editUser(this.userIdentifier, data)

  }
  get submitDisabled() {
    return this.manageUserForm.invalid
  }
  navigateToDash() {
    this.router.navigate(['/dash']);
  }
}
