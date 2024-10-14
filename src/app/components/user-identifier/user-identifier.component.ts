import {ChangeDetectionStrategy, Component, inject, Input, OnDestroy, OnInit} from '@angular/core';
import {ControlContainer, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {ErrorContextDirective} from '../error-handling/form-error-handling/error-context.directive';
import {InputTextModule} from 'primeng/inputtext';
import { ButtonModule} from 'primeng/button';
@Component({
  selector: 'app-user-identifier',
  standalone: true,
  imports: [
    ErrorContextDirective,
    FormsModule,
    InputTextModule,
    ReactiveFormsModule,
    ButtonModule
  ],
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: () => inject(ControlContainer, {skipSelf: true})
    }
  ],
  templateUrl: './user-identifier.component.html',
  styleUrl: './user-identifier.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserIdentifierComponent implements OnInit, OnDestroy {
  parentContainer = inject(ControlContainer);
  @Input() controlKey = 'identifier';
  get parentFormGroup() {
    return this.parentContainer.control as FormGroup;
  }
  ngOnInit() {
    this.parentFormGroup.addControl(
      this.controlKey,
      new FormControl('', [Validators.required])
    );
  }
  async createUniqueIdentifier(): Promise<string> {
    const rawIdentifier = new TextEncoder().encode(new Date().getTime() + Math.random().toString());
    const hashBuffer = await crypto.subtle.digest('SHA-256', rawIdentifier);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    console.log(hashHex)
    return hashHex;
  }
  async setUniqueIdentifier(): Promise<void> {
    const identifier = await this.createUniqueIdentifier();
    this.parentFormGroup.get(this.controlKey)?.setValue(identifier);
  }
  ngOnDestroy() {
    this.parentFormGroup.removeControl(this.controlKey);
  }
}
