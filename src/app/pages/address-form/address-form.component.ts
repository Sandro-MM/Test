import { Component, Input, inject } from '@angular/core';
import { ControlContainer, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {InputGroupModule} from 'primeng/inputgroup';
import {InputGroupAddonModule} from 'primeng/inputgroupaddon';

@Component({
  selector: 'app-address-group',
  standalone: true,
  imports: [ReactiveFormsModule, InputGroupModule, InputGroupAddonModule],
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: () => inject(ControlContainer, {skipSelf: true})
    }
  ],
  templateUrl: './address-form.component.component.html',
  styleUrl: './address-form.component.component.css',
})
export class AddressGroupComponent {
  @Input({ required: true }) controlKey = '';
  @Input() label = '';
  parentContainer = inject(ControlContainer);

  get parentFormGroup() {
    return this.parentContainer.control as FormGroup;
  }

  ngOnInit() {
    this.parentFormGroup.addControl(this.controlKey,
      new FormGroup({
        zipCode: new FormControl(''),
        street: new FormControl('')
      }))
  }
  ngOnDestroy() {
    this.parentFormGroup.removeControl(this.controlKey);
  }
}
