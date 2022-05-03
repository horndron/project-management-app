import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'rsm-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss']
})
export class EmailComponent {
  @Input()
  authForm!: FormGroup;

  get email() {
    return this.authForm.get('email');
  }
}
