import {
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { ConfirmationService } from 'src/app/core/services/confirmation/confirmation.service';
import { Task } from 'src/app/models/task';

@Component({
  selector: 'rsm-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent {
  @Input() task: Task;

  @Output() deleteTask = new EventEmitter<Task>();

  constructor(private readonly confirmationService: ConfirmationService) { }

  remove(): void {
    this.confirmationService.delete(() => this.deleteTask.emit(this.task));
  }
}
