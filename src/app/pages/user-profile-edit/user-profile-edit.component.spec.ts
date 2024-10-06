import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { UserProfileEditComponent } from './user-profile-edit.component';
import {ProfileService} from '../../api-service/profile.service';
import { MessageService } from 'primeng/api';
import { of } from 'rxjs';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {delay} from 'rxjs/operators';
class MockProfileService {
  getUserProfile() {
    return of({
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phoneNumber: '1234567890',
      profilePicture: null,
    }).pipe(delay(100));
  }

  updateUserProfile(profile: any) {
    return of({ success: true }).pipe(delay(100));
  }
}


describe('UserProfileEditComponent', () => {
  let component: UserProfileEditComponent;
  let fixture: ComponentFixture<UserProfileEditComponent>;
  let profileService: ProfileService;
  let messageService: jasmine.SpyObj<MessageService>;

  beforeEach(async () => {
    messageService = jasmine.createSpyObj('MessageService', ['add']);

    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        UserProfileEditComponent
      ],
      providers: [
        { provide: ProfileService, useClass: MockProfileService },
        { provide: MessageService, useValue: messageService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UserProfileEditComponent);
    component = fixture.componentInstance;
    profileService = TestBed.inject(ProfileService);
    fixture.detectChanges();
  });


  it('should create the form with default values', () => {
    expect(component.form).toBeDefined();
    expect(component.form.get('firstName')?.value).toBe('');
    expect(component.form.get('lastName')?.value).toBe('');
    expect(component.form.get('email')?.value).toBe('');
    expect(component.form.get('phoneNumber')?.value).toBe('');
  });

  it('should populate the form with user profile data', fakeAsync(() => {
    spyOn(profileService, 'getUserProfile').and.callThrough();
    component.getData();
    tick(1000);
    fixture.detectChanges();
    expect(profileService.getUserProfile).toHaveBeenCalled();
    expect(component.form.get('firstName')?.value).toBe('John');
    expect(component.form.get('lastName')?.value).toBe('Doe');
    expect(component.form.get('email')?.value).toBe('john.doe@example.com');
    expect(component.form.get('phoneNumber')?.value).toBe('1234567890');
  }));

  it('should set newProfilePicture when onUpload is called', () => {
    const mockFile = new File([''], 'test.png', { type: 'image/png' });
    const event = { currentFiles: [mockFile] };
    component.onUpload(event);
    expect(component.newProfilePicture()).toEqual(mockFile);
  });

  it('should disable the button when the form is invalid and no profile picture is uploaded', () => {
    component.form.controls['firstName'].setValue('');
    component.form.controls['lastName'].setValue('');
    component.form.controls['email'].setValue('');
    component.form.controls['phoneNumber'].setValue('');

    expect(component.buttonDissabled).toBeTrue();
  });

  it('should call updateUserProfile when the form is valid', (done) => {
    component.form.controls['firstName'].setValue('Jane');
    component.form.controls['lastName'].setValue('Doe');
    component.form.controls['email'].setValue('jane.doe@example.com');
    component.form.controls['phoneNumber'].setValue('0987654321');

    spyOn(profileService, 'updateUserProfile').and.callThrough();
    component.onSubmit();
    setTimeout(() => {
      expect(profileService.updateUserProfile).toHaveBeenCalled();
      done();
    }, 100);
  });
});
