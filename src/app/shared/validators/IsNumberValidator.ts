import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function IsNumberValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (!value) {
      return { isNumber: { value } };
    }

    const isNumber = /^[0-9]+(\.[0-9]+)?$/.test(value);
    return isNumber ? null : { isNumber: { value } };
  };
}
