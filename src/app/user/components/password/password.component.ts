import { Component, Input } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'rsm-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss']
})
export class PasswordComponent {
  @Input()
  authForm!: FormGroup;

  public get password(): AbstractControl | null {
    return this.authForm.get('password');
  }

}
