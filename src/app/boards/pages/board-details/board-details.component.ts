import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';

import { ActivatedRoute } from '@angular/router';
import { Board } from 'src/app/models/board';
import { Nullable } from 'src/app/models/core';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Task, TaskUpdate } from 'src/app/models/task';
import { ProgressService } from 'src/app/core/services/progress/progress.service';
import * as fromBoards from '../../store/boards.selectors';
import * as BoardsActions from '../../store/boards.actions';

@Component({
  selector: 'rsm-board-details',
  templateUrl: './board-details.component.html',
  styleUrls: ['./board-details.component.scss'],
})
export class BoardDetailsComponent implements OnInit, OnDestroy {
  board: Nullable<Board>;
  boardId: string;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private readonly store: Store,
    private readonly route: ActivatedRoute,
    public readonly progressService: ProgressService,
  ) { }

  ngOnInit(): void {
    this.boardId = this.route.snapshot.paramMap.get('id') as string;
    this.store.select(fromBoards.getCurrentBoard)
      .pipe(takeUntil(this.destroy$))
      .subscribe((board) => {
        this.board = board?.id === this.boardId ? board : null;
      });

    this.store.dispatch(BoardsActions.loadCurrentBoard({ id: this.boardId }));
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  drop(event: CdkDragDrop<Task[]>) {
    const currentColumnTasks = BoardDetailsComponent.onSortingTasks(event.container.data);
    const tasksUpdate: TaskUpdate[] = [];

    if (event.previousContainer === event.container) {
      if (event.previousIndex < event.currentIndex) {
        for (let i = event.previousIndex; i <= event.currentIndex; i++) {
          if (i === event.previousIndex) {
            tasksUpdate.push(BoardDetailsComponent.onTaskOrderPlus(
              currentColumnTasks[i],
              event.currentIndex,
            ));
          } else {
            tasksUpdate.push(BoardDetailsComponent.onTaskOrderMinus(
              currentColumnTasks[i],
              currentColumnTasks[i].order,
            ));
          }
        }
      } else {
        for (let i = event.currentIndex; i <= event.previousIndex; i++) {
          if (i === event.previousIndex) {
            tasksUpdate.push(BoardDetailsComponent.onTaskOrderPlus(
              currentColumnTasks[i],
              event.currentIndex,
            ));
          } else {
            tasksUpdate.push(BoardDetailsComponent.onTaskOrderPlus(
              currentColumnTasks[i],
              currentColumnTasks[i].order,
            ));
          }
        }
      }
    } else {
      const previousColumnTasks = BoardDetailsComponent
        .onSortingTasks(event.previousContainer.data);
      const currentColumnId = event.container.element.nativeElement.getAttribute('data-id') as string;
      const changedTask: TaskUpdate = BoardDetailsComponent.onTaskOrderPlus(
        previousColumnTasks[event.previousIndex],
        event.currentIndex,
      );
      changedTask.previousColumnId = changedTask.columnId;
      changedTask.columnId = currentColumnId;
      tasksUpdate.push(changedTask);

      for (let i = event.previousIndex + 1; i < previousColumnTasks.length; i++) {
        tasksUpdate.push(BoardDetailsComponent.onTaskOrderMinus(
          previousColumnTasks[i],
          previousColumnTasks[i].order,
        ));
      }

      for (let i = event.currentIndex; i < currentColumnTasks.length; i++) {
        tasksUpdate.push(BoardDetailsComponent.onTaskOrderPlus(
          currentColumnTasks[i],
          currentColumnTasks[i].order,
        ));
      }
    }
    if (tasksUpdate.length > 1 || event.container !== event.previousContainer) {
      this.store.dispatch(BoardsActions.updateTasks({ tasks: tasksUpdate }));
    }
  }

  static onTaskOrderPlus(task: Task, order: number): TaskUpdate {
    const newTask = { ...task } as TaskUpdate;
    newTask.order = order + 1;
    return newTask;
  }

  static onTaskOrderMinus(task: Task, order: number): TaskUpdate {
    const newTask = { ...task } as TaskUpdate;
    newTask.order = order - 1;
    return newTask;
  }

  static onSortingTasks(tasks: Task[]): Task[] {
    const tasksSorted = [...tasks];
    return tasksSorted.sort((a, b) => a.order - b.order);
  }
}
