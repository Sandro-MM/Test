import {ComponentFactoryResolver, Directive, inject, Input, OnDestroy, OnInit, ViewContainerRef,} from '@angular/core';
import {ControlContainer, FormControl, FormGroup} from '@angular/forms';
import {Subscription} from 'rxjs';
import {ErrorComponentComponent} from './error.component.component';
import {errorMessages} from './error-messages';

@Directive({
  standalone: true,
  selector: '[errorContext]'
})
export class ErrorContextDirective implements OnInit, OnDestroy {
  @Input() formControlName!: string;
  viewContainerRef = inject(ViewContainerRef)
  componentFactoryResolver = inject(ComponentFactoryResolver)
  private formControl!: FormControl;
  private statusChangesSubscription!: Subscription | undefined;
  private controlContainer = inject(ControlContainer);

  ngOnInit(): void {
    // Ensure the ControlContainer is injected from the parent
    const parentFormGroup = this.controlContainer.control as FormGroup;

    if (parentFormGroup) {
      this.formControl = parentFormGroup.get(this.formControlName) as FormControl;

      if (!this.formControl) {
        console.error(`No FormControl found for ${this.formControlName}`);
        return;
      }

      console.log(`FormControl ${this.formControlName} found:`, this.formControl);

      // Create ErrorComponentComponent and insert it into the view
      const factory = this.componentFactoryResolver.resolveComponentFactory(ErrorComponentComponent);
      const componentRef = this.viewContainerRef.createComponent(factory);

      // Subscribe to status changes
      this.statusChangesSubscription = this.formControl.statusChanges.subscribe(status => {
        console.log(`FormControl ${this.formControlName} status: ${status}`, this);
        this.displayError(componentRef.instance);
      });

      // Also subscribe to value changes to trigger error checks on interaction
      this.formControl.valueChanges.subscribe(() => {
        this.displayError(componentRef.instance);
      });

      // Initial error display in case the form is already invalid
      this.displayError(componentRef.instance);
    } else {
      console.error('No parent FormGroup found');
    }
  }


  private displayError(errorComponent: ErrorComponentComponent): void {
    console.log('DisplayError called');
    errorComponent.errorMessage = null;
    const isInvalidAndDirty = this.formControl.invalid && (this.formControl.dirty || this.formControl.touched);
    if (isInvalidAndDirty) {
      console.log('Form control is invalid and dirty/touched');
      const errors = this.formControl.errors;
      if (errors) {
        console.log('Errors found:', errors);
        for (const errorKey in errors) {
          if (errorMessages[errorKey]) {
            console.log(`Displaying error message for ${errorKey}`);
            errorComponent.errorMessage = errorMessages[errorKey](errors[errorKey]);
            break;
          }
        }
      }
    }
  }
  ngOnDestroy(): void {
    if (this.statusChangesSubscription) {
      this.statusChangesSubscription.unsubscribe();
    }
  }
}
