import { FormControl } from '@angular/forms';
import { PasswordValidator } from './password.validator';

describe('PasswordValidator', () => {
  const control = new FormControl('input');

  it('should return true hasLength error if input string length is less than max = 8', () => {
    control.setValue('1qQ!');
    const returnedValue = {
      hasNumberLetter: false,
      hasUpperLower: false,
      hasSpecial: false,
      hasLength: true,
    };
    expect(PasswordValidator.check(control)).toEqual(returnedValue);
  });

  it('should return true hasSpecial error if input don\'t contain special caracter', () => {
    control.setValue('123456qQ');
    const returnedValue = {
      hasNumberLetter: false,
      hasUpperLower: false,
      hasSpecial: true,
      hasLength: false,
    };
    expect(PasswordValidator.check(control)).toEqual(returnedValue);
  });

  it('should return true hasUpperLower error if input don\'t contain caracters in lower and upper case', () => {
    control.setValue('123456q!');
    const returnedValue = {
      hasNumberLetter: false,
      hasUpperLower: true,
      hasSpecial: false,
      hasLength: false,
    };
    expect(PasswordValidator.check(control)).toEqual(returnedValue);
  });

  it('should return true hasNumberLetter error if input don\'t contain both number and letters', () => {
    control.setValue('qwerQWER!');
    const returnedValue = {
      hasNumberLetter: true,
      hasUpperLower: false,
      hasSpecial: false,
      hasLength: false,
    };
    expect(PasswordValidator.check(control)).toEqual(returnedValue);
  });
});
