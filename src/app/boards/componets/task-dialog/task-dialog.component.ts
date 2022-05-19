import { Store } from '@ngrx/store';
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
import { Nullable } from 'src/app/models/core';
import { Task } from 'src/app/models/task';
import { selectUsers } from 'src/app/user/store/user.selectors';
import { LoginResponseModel } from '../../../models/user';

@Component({
  selector: 'rsm-task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.scss'],
})
export class TaskDialogComponent implements OnInit {
  formGroup: FormGroup;
  users: LoginResponseModel[];

  @Input() isDialogVisible = false;
  @Input() task?: Nullable<Task> = null;
  @Input() isModifyDisabled = false;

  @Output() isDialogVisibleChange = new EventEmitter<boolean>();
  @Output() save = new EventEmitter<Partial<Task>>();

  constructor(private readonly formBuilder: FormBuilder, private readonly store: Store) { }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      title: [{ value: this.task?.title || '', disabled: this.isModifyDisabled }, Validators.required],
      description: [{ value: this.task?.description || '', disabled: this.isModifyDisabled }, Validators.required],
      user: [{ value: this.task?.userId || null, disabled: this.isModifyDisabled }],
      done: [{ value: this.task?.done || false, disabled: this.isModifyDisabled }],
    });

    this.store.select(selectUsers).subscribe((users) => {
      this.users = users;
    });
  }

  get titleControl(): FormControl {
    return this.formGroup.get('title') as FormControl;
  }

  get descriptionControl(): FormControl {
    return this.formGroup.get('description') as FormControl;
  }

  get userControl(): FormControl {
    return this.formGroup.get('user') as FormControl;
  }

  get doneControl(): FormControl {
    return this.formGroup.get('done') as FormControl;
  }

  get isFormValid(): boolean {
    return this.formGroup.valid;
  }

  get isFormTouched(): boolean {
    return this.formGroup.touched;
  }

  handleSave() {
    this.save.emit({
      title: this.titleControl.value,
      description: this.descriptionControl.value,
      done: this.doneControl.value || false,
      userId: this.userControl.value,
      order: this.task?.order || 0,
    });

    this.handleCancel();
  }

  handleCancel(): void {
    this.isDialogVisibleChange.emit(false);
    this.formGroup.reset();
  }

  showDialog(): void {
    this.isDialogVisible = true;
  }
}
