import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import {
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { ConfirmationService } from 'src/app/core/services/confirmation/confirmation.service';
import { Column } from 'src/app/models/column';
import { Task } from 'src/app/models/task';

@Component({
  selector: 'rsm-board-column',
  templateUrl: './board-column.component.html',
  styleUrls: ['./board-column.component.scss'],
})
export class BoardColumnComponent {
  isDialogVisible = false;

  @Input() boardId: string;
  @Input() column: Column;

  @Output() deleteColumn = new EventEmitter<string>();
  @Output() deleteTask = new EventEmitter<Task>();
  @Output() updateTask = new EventEmitter<Partial<Task>>();
  @Output() addTask = new EventEmitter<Partial<Task>>();

  constructor(private readonly confirmationService: ConfirmationService) { }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.column.tasks, event.previousIndex, event.currentIndex);
  }

  remove(): void {
    this.confirmationService.delete(() => this.deleteColumn.emit());
  }

  handleDeleteTask(task: Task): void {
    this.deleteTask.emit({ ...task, columnId: this.column.id });
  }

  handleAddTask(task: Partial<Task>): void {
    this.addTask.emit({
      ...task,
      columnId: this.column.id,
      boardId: this.boardId,
      order: Math.max(...this.column?.tasks.map((t) => t.order) || []) + 1,
    });
  }

  handleUpdateTask(task: Partial<Task>, taskId: string): void {
    this.updateTask.emit({
      ...task,
      id: taskId,
      columnId: this.column.id,
      boardId: this.boardId,
    });
  }

  showDialog(): void {
    this.isDialogVisible = true;
  }
}
