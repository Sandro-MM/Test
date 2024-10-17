import {ChangeDetectionStrategy, Component, inject, Input, OnDestroy, OnInit} from '@angular/core';
import {ErrorContextDirective} from '../error-handling/form-error-handling/error-context.directive';
import {InputTextModule} from 'primeng/inputtext';
import {ControlContainer, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {passwordPattern} from '../error-handling/form-error-handling/pattern-formats';
@Component({
  selector: 'app-user-credentials',
  standalone: true,
  imports: [
    ErrorContextDirective,
    InputTextModule,
    ReactiveFormsModule
  ],
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: () => inject(ControlContainer, {skipSelf: true})
    }
  ],
  templateUrl: './user-credentials.component.html',
  styleUrl: './user-credentials.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserCredentialsComponent implements OnInit, OnDestroy {
  parentContainer = inject(ControlContainer);
  @Input() controlKey = 'credentials';
  get parentFormGroup() {
    return this.parentContainer.control as FormGroup;
  }
  ngOnInit() {
    this.parentFormGroup.addControl(this.controlKey,
      new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required, passwordPattern()]),

      }))
  }
  ngOnDestroy() {
    this.parentFormGroup.removeControl(this.controlKey);
  }
}
