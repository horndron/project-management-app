import { FormControl } from '@angular/forms';

export interface ValidationResult {
  [key: string]: boolean;
}

export class PasswordValidator {
  public static check(control: FormControl): ValidationResult | null {
    const hasNumber = /[0-9]/.test(control.value);
    const hasUpper = /[A-Z]/.test(control.value);
    const hasLower = /[a-z]/.test(control.value);
    const hasSpecial = /[^(A-Za-z0-9)]/.test(control.value);
    const hasLength = control.value.length >= 8;

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
