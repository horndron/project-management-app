import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  catchError,
  Observable,
  of,
} from 'rxjs';

import { EntityPaths } from '../../../constants/api';
import { Task } from '../../../models/task';
import { environment } from '../../../../environments/environment';
import { Nullable } from '../../../models/core';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  constructor(private readonly http: HttpClient) {}

  getAll$(boardId: string, columnId: string): Observable<Task[]> {
    return this.http.get<Task[]>(`${environment.baseUrl}${EntityPaths.Boards}/${boardId}/${EntityPaths.Columns}/${columnId}/${EntityPaths.Tasks}`)
      .pipe(catchError(() => of([])));
  }

  getTask(boardId: string, columnId: string, taskId: string): Observable<Nullable<Task>> {
    return this.http.get<Task>(`${environment.baseUrl}${EntityPaths.Boards}/${boardId}/${EntityPaths.Columns}/${columnId}/${EntityPaths.Tasks}/${taskId}`)
      .pipe(catchError(() => of(null)));
  }
}
