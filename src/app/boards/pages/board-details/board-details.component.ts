import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';

import { ActivatedRoute } from '@angular/router';
import { Board } from 'src/app/models/board';
import { Nullable } from 'src/app/models/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Task, TaskUpdate } from 'src/app/models/task';
import { ProgressService } from 'src/app/core/services/progress/progress.service';
import { Column, ColumnUpdate } from 'src/app/models/column';
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
  columns: Column[];
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
        this.columns = this.board
          ? BoardDetailsComponent.onSortingColumns(this.board.columns)
          : [];
      });

    this.store.dispatch(BoardsActions.loadCurrentBoard({ id: this.boardId }));
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  onDropTasks(event: CdkDragDrop<Task[]>) {
    const currentColumnTasks = BoardDetailsComponent
      .onSortingTasks(event.container.data) as TaskUpdate[];
    const tasksUpdate: TaskUpdate[] = [];

    if (event.previousContainer === event.container) {
      if (event.previousIndex < event.currentIndex) {
        for (let i = event.previousIndex; i <= event.currentIndex; i += 1) {
          if (i === event.previousIndex) {
            tasksUpdate.push(BoardDetailsComponent.onOrderPlus(
              currentColumnTasks[i],
              event.currentIndex,
            ));
          } else {
            tasksUpdate.push(BoardDetailsComponent.onOrderMinus(
              currentColumnTasks[i],
              currentColumnTasks[i].order,
            ));
          }
        }
      } else {
        for (let i = event.currentIndex; i <= event.previousIndex; i += 1) {
          if (i === event.previousIndex) {
            tasksUpdate.push(BoardDetailsComponent.onOrderPlus(
              currentColumnTasks[i],
              event.currentIndex,
            ));
          } else {
            tasksUpdate.push(BoardDetailsComponent.onOrderPlus(
              currentColumnTasks[i],
              currentColumnTasks[i].order,
            ));
          }
        }
      }
    } else {
      const previousColumnTasks = BoardDetailsComponent
        .onSortingTasks(event.previousContainer.data) as TaskUpdate[];
      const currentColumnId = event.container.element.nativeElement.getAttribute('data-id') as string;
      const changedTask: TaskUpdate = BoardDetailsComponent.onOrderPlus(
        previousColumnTasks[event.previousIndex],
        event.currentIndex,
      );
      changedTask.previousColumnId = changedTask.columnId;
      changedTask.columnId = currentColumnId;
      tasksUpdate.push(changedTask);

      for (let i = event.previousIndex + 1; i < previousColumnTasks.length; i += 1) {
        tasksUpdate.push(BoardDetailsComponent.onOrderMinus(
          previousColumnTasks[i],
          previousColumnTasks[i].order,
        ));
      }

      for (let i = event.currentIndex; i < currentColumnTasks.length; i += 1) {
        tasksUpdate.push(BoardDetailsComponent.onOrderPlus(
          currentColumnTasks[i],
          currentColumnTasks[i].order,
        ));
      }
    }
    if (tasksUpdate.length > 1 || event.container !== event.previousContainer) {
      this.store.dispatch(BoardsActions.updateOrderTasks({ tasks: tasksUpdate }));
    }
  }

  onDropColumn(event: CdkDragDrop<Column[]>) {
    if (event.previousIndex !== event.currentIndex) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      let newColumns = this.columns.map((column, index) => {
        const newColumn = { ...column } as ColumnUpdate;
        newColumn.newOrder = newColumn.order > 0 ? -index - 1 : index + 1;
        return newColumn;
      });
      newColumns = BoardDetailsComponent.onSortingColumns(newColumns).reverse();

      this.store.dispatch(BoardsActions.updateOrderColumns({
        columns: newColumns,
        boardId: (this.board as Board).id,
      }));
    }
  }

  static onOrderPlus(elem: TaskUpdate, order: number): TaskUpdate {
    const newTask = { ...elem };
    newTask.order = order + 1;
    return newTask;
  }

  static onOrderMinus(elem: TaskUpdate, order: number): TaskUpdate {
    const newTask = { ...elem };
    newTask.order = order - 1;
    return (newTask as TaskUpdate);
  }

  static onSortingTasks(tasks: Task[]): Task[] {
    const tasksSorted = [...tasks];
    return tasksSorted.sort((a, b) => a.order - b.order);
  }
  static onSortingColumns(columns: Column[]): Column[] {
    const columnsSorted = [...columns];
    return columnsSorted.sort((a, b) => Math.abs(a.order) - Math.abs(b.order));
  }
}
