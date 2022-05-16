import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  catchError,
  map,
  Observable,
  of,
} from 'rxjs';

import { EntityPaths } from '../../../constants/api';
import { RemovedTaskParameters, Task, TaskUpdate } from '../../../models/task';
import { environment } from '../../../../environments/environment';
import { Nullable } from '../../../models/core';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  constructor(private readonly http: HttpClient) {}

  remove$(
    id: string,
    boardId: string,
    columnId: string,
  ): Observable<Nullable<RemovedTaskParameters>> {
    return this.http.delete<RemovedTaskParameters>(`${environment.baseUrl}${EntityPaths.Boards}/${boardId}/${EntityPaths.Columns}/${columnId}/${EntityPaths.Tasks}/${id}`).pipe(
      map(() => ({ id, columnId })),
      catchError(() => of(null)),
    );
  }

  getAll$(boardId: string, columnId: string): Observable<Task[]> {
    return this.http.get<Task[]>(`${environment.baseUrl}${EntityPaths.Boards}/${boardId}/${EntityPaths.Columns}/${columnId}/${EntityPaths.Tasks}`)
      .pipe(catchError(() => of([])));
  }

  getOne$(id: string, boardId: string, columnId: string): Observable<Nullable<Task>> {
    return this.http.get<Task>(`${environment.baseUrl}${EntityPaths.Boards}/${boardId}/${EntityPaths.Columns}/${columnId}/${EntityPaths.Tasks}/${id}`)
      .pipe(catchError(() => of(null)));
  }

  update$(task: TaskUpdate): Observable<Task> {
    return task.previousColumnId
      ? this.http.put<Task>(
        `${environment.baseUrl}${EntityPaths.Boards}/${task.boardId}/${EntityPaths.Columns}/${task.previousColumnId}/${EntityPaths.Tasks}/${task.id}`,
        {
          title: task.title,
          done: task.done,
          order: task.order,
          description: task.description,
          userId: task.userId,
          boardId: task.boardId,
          columnId: task.columnId,
        },
      )
      : this.http.put<Task>(
        `${environment.baseUrl}${EntityPaths.Boards}/${task.boardId}/${EntityPaths.Columns}/${task.columnId}/${EntityPaths.Tasks}/${task.id}`,
        {
          title: task.title,
          done: task.done,
          order: task.order,
          description: task.description,
          userId: task.userId,
          boardId: task.boardId,
          columnId: task.columnId,
        },
      );
  }
}
