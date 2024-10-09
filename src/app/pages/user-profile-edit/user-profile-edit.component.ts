import {ChangeDetectionStrategy, Component, inject, OnInit, signal,} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {InputTextModule} from 'primeng/inputtext';
import {InputGroupAddonModule} from 'primeng/inputgroupaddon';
import {InputGroupModule} from 'primeng/inputgroup';
import {FileUploadModule} from 'primeng/fileupload';
import {ToastModule} from 'primeng/toast';
import {MessageService} from 'primeng/api';
import {HttpClient} from '@angular/common/http';
import {ProfileService} from '../../api-service/profile.service';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {AvatarModule} from 'primeng/avatar';
import {AddressGroupComponent} from '../address-form/address-form.component';

@Component({
  selector: 'app-user-profile-edit',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputGroupModule,
    InputGroupAddonModule,
    InputTextModule,
    FileUploadModule,
    ToastModule,
    ProgressSpinnerModule,
    AvatarModule,
    AddressGroupComponent,
  ],
  templateUrl: './user-profile-edit.component.html',
  styleUrls: ['./user-profile-edit.component.css'],
  providers: [MessageService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserProfileEditComponent implements OnInit {


  newProfilePicture = signal<any>(null);
  ProfilePicture = signal<any>(null);
  loading = signal(true);


  fb = inject(FormBuilder)
  messageService= inject(MessageService)
  http = inject(HttpClient)
  profileService = inject(ProfileService)


  form = new FormGroup({
    firstName: new FormControl('',[Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phoneNumber: new FormControl('', [Validators.pattern(/^[0-9]*$/)]),
  })
  get firstName() {
    return this.form.get('firstName');
  }

  get lastName() {
    return this.form.get('lastName');
  }

  get email() {
    return this.form.get('email');
  }

  get phoneNumber() {
    return this.form.get('phoneNumber');
  }

  get buttonDissabled() {
    return this.form.invalid || (!this.form.dirty && !this.newProfilePicture());
  }

  ngOnInit(): void {

    this.getData()
  }



  getData() {
    this.profileService.getUserProfile().subscribe((data) => {
      this.form.patchValue(data);
      this.ProfilePicture.set(data.profilePicture);
      this.loading.set(false);
    });
  }

  onUpload(event: any) {
    this.newProfilePicture.set(event.currentFiles[0]);
    this.messageService.add({severity: 'info', summary: 'File Uploaded', detail: ''});
  }

  onSubmit() {
    console.log(this.form)
    if (this.form.valid) {
      this.loading.set(true);
      const updatedProfile: any = {
        ...this.form.value,
        profilePicture: this.newProfilePicture() || null
      };

      this.profileService.updateUserProfile(updatedProfile).subscribe({
        next: (response) => {
          this.form.reset()
          this.newProfilePicture.set(null)
          if (response.success) {
            this.messageService.add({
              severity: 'success',
              summary: 'Profile Updated',
              detail: 'Your profile has been updated successfully!'
            });
          }
        },
        error: () => {
          this.messageService.add({severity: 'error', summary: 'Update Failed', detail: 'Unable to update profile.'});
        },
        complete: () => {
          this.loading.set(false);
          this.getData();
        }
      });
    }
  }
}
