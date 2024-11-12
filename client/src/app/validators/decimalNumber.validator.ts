import { AbstractControl } from '@angular/forms';
export function DecimalNumberValidator(control: AbstractControl): {invalidNumber: boolean} | null {
    const IS_VALID = /^\d+(\.\d+)?$/;
    return !IS_VALID.test(control.value) ? {invalidNumber: true} : null;
}