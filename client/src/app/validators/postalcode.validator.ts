import { AbstractControl } from '@angular/forms';
export function ValidatePostalCode(control: AbstractControl): {invalidPostalCode: boolean} | null {
    const EMAIL_REGEX = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/;
    return !EMAIL_REGEX.test(control.value) ? {invalidPostalCode: true} : null;
}