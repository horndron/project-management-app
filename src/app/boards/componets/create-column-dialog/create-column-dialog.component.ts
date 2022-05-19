import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import { Column } from '../../../models/column';

@Component({
  selector: 'rsm-create-column-dialog',
  templateUrl: './create-column-dialog.component.html',
  styleUrls: ['./create-column-dialog.component.scss'],
})
export class CreateColumnDialogComponent implements OnInit {
  formGroup: FormGroup;

  @Input() isDialogVisible = false;

  @Output() isDialogVisibleChange = new EventEmitter<boolean>();
  @Output() addColumn = new EventEmitter<Partial<Column>>();

  constructor(private readonly formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      title: ['', [Validators.required]],
    });
  }

  get titleControl(): FormControl {
    return this.formGroup.get('title') as FormControl;
  }

  get isFormValid(): boolean {
    return this.formGroup.valid;
  }

  get isFormTouched(): boolean {
    return this.formGroup.touched;
  }

  save() {
    this.addColumn.emit({
      title: this.formGroup.get('title')?.value,
    });

    this.cancel();
    this.formGroup.reset();
  }

  cancel(): void {
    this.isDialogVisibleChange.emit(false);
  }
}
