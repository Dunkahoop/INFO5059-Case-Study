import { AbstractControl } from '@angular/forms';
export function QuantityValidator(control: AbstractControl): {invalidQuantity: boolean} | null {
    const IS_VALID = /^\d+$/;
    return !IS_VALID.test(control.value) ? {invalidQuantity: true} : null;
}