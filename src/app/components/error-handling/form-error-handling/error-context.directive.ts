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
    const parentFormGroup = this.controlContainer.control as FormGroup;
    if (parentFormGroup) {
      this.formControl = parentFormGroup.get(this.formControlName) as FormControl;
      if (!this.formControl) {
        return;
      }
      const factory = this.componentFactoryResolver.resolveComponentFactory(ErrorComponentComponent);
      const componentRef = this.viewContainerRef.createComponent(factory);

      this.statusChangesSubscription = this.formControl.statusChanges.subscribe(status => {
        console.log(`FormControl ${this.formControlName} status: ${status}`, this);
        this.displayError(componentRef.instance);
      });

      this.formControl.valueChanges.subscribe(() => {
        this.displayError(componentRef.instance);
      });

      this.displayError(componentRef.instance);
    } else {
      console.error('No parent FormGroup found');
    }
  }

  ngOnDestroy(): void {
    if (this.statusChangesSubscription) {
      this.statusChangesSubscription.unsubscribe();
    }
  }

  private displayError(errorComponent: ErrorComponentComponent): void {

    errorComponent.errorMessage = null;
    const isInvalidAndDirty = this.formControl.invalid && (this.formControl.dirty || this.formControl.touched);
    if (isInvalidAndDirty) {
      const errors = this.formControl.errors;
      if (errors) {
        for (const errorKey in errors) {
          if (errorMessages[errorKey]) {
            errorComponent.errorMessage = errorMessages[errorKey](errors[errorKey]);
            break;
          }
        }
      }
    }
  }
}
