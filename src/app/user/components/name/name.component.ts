import { Component, Input } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'rsm-name',
  templateUrl: './name.component.html',
  styleUrls: ['./name.component.scss'],
})
export class NameComponent {
  @Input() authForm!: FormGroup;

  public get name(): AbstractControl | null {
    return this.authForm.get('name');
  }
}
