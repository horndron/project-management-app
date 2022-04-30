import { FormControl } from '@angular/forms';

export interface ValidationResult {
  [key: string]: boolean;
}

export class PasswordValidator {
  public static check(control: FormControl): ValidationResult | null {
    let hasNumber = /[0-9]/.test(control.value);
    let hasUpper = /[A-Z]/.test(control.value);
    let hasLower = /[a-z]/.test(control.value);
    let hasSpecial = /[^(A-Za-z0-9)]/.test(control.value);
    let hasLength = control.value.length >= 8;

    const valid = hasNumber && hasUpper && hasLower && hasSpecial && hasLength;
    if (!valid) {
      return {
        hasNumberLetter: !hasNumber || (!hasUpper && !hasLower),
        hasUpperLower: !hasUpper || !hasLower,
        hasSpecial: !hasSpecial,
        hasLength: !hasLength,
      };
    }
    return null;
  }
}
