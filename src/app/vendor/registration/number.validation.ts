import { AbstractControl, FormGroup } from '@angular/forms';

export function mobileNumber(control: AbstractControl) {
    if (control && (control.value !== null || control.value !== undefined)) {
        const num = /^[0-9]{10}$/;
        if (!num.test(control.value)) {
            return {
                isError: true
            };
        }
        return null;
    }
}
