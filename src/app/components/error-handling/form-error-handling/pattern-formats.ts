import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function englishLettersPattern(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const englishPattern = /^[A-Za-z]+$/;
    if (control.value && !englishPattern.test(control.value)) {
      return { englishPattern: true };
    }
    return null;
  };
}

export function pinPattern(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const numberPattern = /^[0-9]{11}$/;
    if (!control.value) {
      return null;
    }
    if (!numberPattern.test(control.value)) {
      return { pinPattern: true };
    }
    return null;
  };
}
export function passwordPattern(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const passwordRegex = /^[A-Za-z0-9]{6,12}$/;
    if (!control.value) {
      return null;
    }
    if (!passwordRegex.test(control.value)) {
      return { passwordPattern: true };
    }
    return null;
  };
}
export function phonePattern(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const numberPattern = /^[0-9]{9}$/;
    if (!control.value) {
      return null;
    }
    if (!numberPattern.test(control.value)) {
      return { phonePattern: true };
    }
    return null;
  };
}
