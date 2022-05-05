import { Component, Input } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'rsm-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss']
})
export class EmailComponent {
  @Input()
  authForm!: FormGroup;

  public get email(): AbstractControl | null {
    return this.authForm.get('email');
  }
}
