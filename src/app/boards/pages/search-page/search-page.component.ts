import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import {
  Subscription,
  switchMap,
  tap,
  forkJoin,
  mergeMap,
  from,
  map,
  filter,
} from 'rxjs';
import { Task } from 'src/app/models/task';
import { UserHttpService } from 'src/app/user/services/user-http.service';

import { Board } from '../../../models/board';
import { BoardsService } from '../../services/boards/boards.service';
import { ColumnsService } from '../../services/columns/columns.service';
import { TasksService } from '../../services/tasks/tasks.service';

const SEARCH_VALUE = 'searchValue';
enum SearchFields {
  TITLE = 'title',
  DESCRIPTION = 'description',
  ID = 'id',
}

@Component({
  selector: 'rsm-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss'],
})
export class SearchPageComponent implements OnInit, OnDestroy {
  private boards: Board[] = [];
  private subscriptions = new Subscription();
  private searchValue = '';

  public idResults: Task[] = [];
  public titleResults: Task[] = [];
  public membersResults: Task[] = [];
  public descriptionResults: Task[] = [];
  public searchLoaded = false;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly boardsService: BoardsService,
    private readonly columnsService: ColumnsService,
    private readonly tasksService: TasksService,
    private readonly userService: UserHttpService,
  ) {}

  public ngOnInit(): void {
    this.subscriptions.add(this.route.params.pipe(
      map((params: Params) => params[SEARCH_VALUE]),
      tap((query: string) => {
        this.searchValue = query.toLowerCase();
        this.resetOldSearchData();
      }),
      switchMap(() => this.boardsService.getAll$().pipe(
        tap((boards) => {
          this.boards = [...boards];
        }),
        switchMap((boards) => forkJoin(
          boards.map((board) => this.columnsService.getAll$(board.id)),
        )),
        tap((columns) => {
          this.boards.forEach((board, idx) => {
            board.columns = [];
            board.columns.push(...columns[idx]);
          });
        }),
        mergeMap(() => this.boards.map((board) => forkJoin(
          board.columns.map((column) => this.tasksService.getAll$(board.id, column.id)),
        ))),
        mergeMap((resArr) => from(resArr).pipe(mergeMap((res) => res))),
        tap((allTasks) => {
          if (this.searchValue !== '') {
            this.idResults = this.idResults.concat(
              this.filterTasks(allTasks, SearchFields.ID),
            );

            this.titleResults = this.titleResults.concat(
              this.filterTasks(allTasks, SearchFields.TITLE),
            );

            this.descriptionResults = this.descriptionResults.concat(
              this.filterTasks(allTasks, SearchFields.DESCRIPTION),
            );

            this.findUserNamesById(allTasks);
          }
        }),
      )),
    )
      .subscribe(() => {
        this.searchLoaded = true;
      }));
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private filterTasks(arr: Task[], param: keyof Task): Task[] {
    return arr.filter((_task) => _task[param as keyof Task]
      .toString()
      .toLowerCase()
      .includes(this.searchValue));
  }

  private findUserNamesById(arr: Task[]): void {
    arr.forEach((task) => {
      if (task.userId) {
        this.subscriptions.add(this.userService
          .getUserById(task.userId)
          .pipe(
            map((user) => user.name.toLowerCase()),
            filter((userName) => userName.includes(this.searchValue)),
          )
          .subscribe(() => {
            this.membersResults.push(task);
          }));
      }
    });
  }

  private resetOldSearchData(): void {
    this.idResults = [];
    this.titleResults = [];
    this.membersResults = [];
    this.descriptionResults = [];
    this.searchLoaded = false;
  }
}
