import {ChangeDetectionStrategy, Component, inject, Input, OnDestroy, OnInit} from '@angular/core';
import {ControlContainer, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {InputTextModule} from 'primeng/inputtext';
import {FileUploadModule} from 'primeng/fileupload';
import {ErrorContextDirective} from '../error-handling/form-error-handling/error-context.directive';
import {englishLettersPattern, phonePattern, pinPattern} from '../error-handling/form-error-handling/pattern-formats';
import {RadioGroupComponent} from '../radio-group/radio-group.component';

@Component({
  selector: 'app-user-profile-edit',
  standalone: true,
  imports: [
    RadioGroupComponent,
    ReactiveFormsModule,
    InputTextModule,
    ErrorContextDirective,
    FileUploadModule
  ],
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: () => inject(ControlContainer, {skipSelf: true})
    }
  ],
  templateUrl: './user-profile-info.component.html',
  styleUrls: ['./user-profile-info.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserProfileInfoComponent implements OnInit, OnDestroy {
  parentContainer = inject(ControlContainer);
  @Input() controlKey = 'personalInfo';
  genders: any[] = [
    {name: 'Man', key: 'M'},
    {name: 'Woman', key: 'W'},
  ];

  get parentFormGroup() {
    return this.parentContainer.control as FormGroup;
  }

  ngOnInit() {
    this.parentFormGroup.addControl(this.controlKey,
      new FormGroup({
        firstName: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(50), englishLettersPattern()]),
        lastName: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(50), englishLettersPattern()]),
        pin: new FormControl('', [Validators.required, pinPattern(),]),
        address: new FormControl('', [Validators.required]),
        phoneNumber: new FormControl('', [phonePattern()]),
        selectedGender: new FormControl('Man'),
        profilePicture: new FormControl(null),
      }))
  }

  onFileSelect(event: any) {
    const file = event.files[0];
    this.parentFormGroup.patchValue({
      profilePicture: file
    });
    this.parentFormGroup.get('profilePicture')?.updateValueAndValidity();
  }

  getNestedFormGroup(): FormGroup | null {
    const formGroup = this.parentFormGroup.get(this.controlKey) as FormGroup;
    if (!formGroup) {
      console.error(`FormGroup not found for controlKey: ${this.controlKey}`);
      return null;
    }
    return formGroup;
  }

  ngOnDestroy() {
    this.parentFormGroup.removeControl(this.controlKey);
  }
}
