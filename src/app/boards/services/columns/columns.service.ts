import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  catchError,
  Observable,
  of,
} from 'rxjs';

import { Column, ColumnUpdate } from '../../../models/column';
import { environment } from '../../../../environments/environment';
import { EntityPaths } from '../../../constants/api';

@Injectable({
  providedIn: 'root',
})
export class ColumnsService {
  constructor(private readonly http: HttpClient) {}

  getAll$(boardId: string): Observable<Column[]> {
    return this.http.get<Column[]>(`${environment.baseUrl}${EntityPaths.Boards}/${boardId}/${EntityPaths.Columns}`)
      .pipe(catchError(() => of([])));
  }

  update$(column: ColumnUpdate, boardId: string): Observable<Column | null> {
    return this.http.put<Column>(
      `${environment.baseUrl}${EntityPaths.Boards}/${boardId}/${EntityPaths.Columns}/${column.id}`,
      {
        title: column.title,
        order: column.newOrder,
      },
    ).pipe(catchError(() => of(null)));
  }
}
