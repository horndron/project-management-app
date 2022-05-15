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

import { Board } from '../../../models/board';

@Component({
  selector: 'rsm-create-board-dialog',
  templateUrl: './create-board-dialog.component.html',
  styleUrls: ['./create-board-dialog.component.scss'],
})
export class CreateBoardDialogComponent implements OnInit {
  formGroup: FormGroup;

  @Input() isDialogVisible = false;

  @Output() isDialogVisibleChange = new EventEmitter<boolean>();
  @Output() addBoard = new EventEmitter<Partial<Board>>();

  constructor(private readonly formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });
  }

  get titleControl(): FormControl {
    return this.formGroup.get('title') as FormControl;
  }

  get descriptionControl(): FormControl {
    return this.formGroup.get('description') as FormControl;
  }

  get isFormValid(): boolean {
    return this.formGroup.valid;
  }

  get isFormTouched(): boolean {
    return this.formGroup.touched;
  }

  save() {
    this.addBoard.emit({
      title: this.formGroup.get('title')?.value,
      description: this.formGroup.get('description')?.value,
    });
    this.cancel();
    this.formGroup.reset();
  }

  cancel(): void {
    this.isDialogVisibleChange.emit(false);
  }
}
