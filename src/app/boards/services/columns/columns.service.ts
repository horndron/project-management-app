import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  catchError,
  map,
  Observable,
  of,
} from 'rxjs';

import { Column, ColumnUpdate } from '../../../models/column';
import { environment } from '../../../../environments/environment';
import { Nullable } from '../../../models/core';
import { EntityPaths } from '../../../constants/api';

@Injectable({
  providedIn: 'root',
})
export class ColumnsService {
  constructor(private readonly http: HttpClient) {}

  remove$(id: string, boardId: string): Observable<string> {
    return this.http.delete<void>(`${environment.baseUrl}${EntityPaths.Boards}/${boardId}/${EntityPaths.Columns}/${id}`).pipe(
      map(() => id),
      catchError(() => of('')),
    );
  }

  create$(column: Partial<Column>, boardId: string): Observable<Nullable<Column>> {
    return this.http.post<Column>(`${environment.baseUrl}${EntityPaths.Boards}/${boardId}/${EntityPaths.Columns}`, column).pipe(catchError(() => of(null)));
  }

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

  changeOne$(boardId: string, column: Partial<Column>): Observable<Nullable<Column>> {
    const columnBody = {
      title: column.title,
      order: column.order,
    };
    return this.http.put<Column>(`${environment.baseUrl}${EntityPaths.Boards}/${boardId}/${EntityPaths.Columns}/${column.id}`, columnBody)
      .pipe(catchError(() => of(null)));
  }
}
