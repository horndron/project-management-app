import {
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { ConfirmationService } from 'src/app/core/services/confirmation/confirmation.service';
import { Task } from 'src/app/models/task';

@Component({
  selector: 'rsm-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent {
  isDialogVisible = false;

  @Input() task: Task;
  @Input() isModifyDisabled = false;

  @Output() deleteTask = new EventEmitter<Task>();
  @Output() updateTask = new EventEmitter<Partial<Task>>();

  constructor(
    private readonly confirmationService: ConfirmationService,
    private readonly store: Store,
  ) { }

  remove(event: Event): void {
    event.stopPropagation();

    this.confirmationService.delete(() => this.deleteTask.emit(this.task));
  }

  update(task: Partial<Task>): void {
    this.updateTask.emit(task);
  }

  showDialog(): void {
    this.isDialogVisible = true;
  }
}
