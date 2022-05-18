import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  catchError,
  Observable,
  of,
} from 'rxjs';

import { Column } from '../../../models/column';
import { environment } from '../../../../environments/environment';
import { Nullable } from '../../../models/core';
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

  changeOne$(boardId: string, column: Partial<Column>): Observable<Nullable<Column>> {
    const columnBody = {
      title: column.title,
      order: column.order,
    };
    return this.http.put<Column>(`${environment.baseUrl}${EntityPaths.Boards}
      /${boardId}/${EntityPaths.Columns}/${column.id}`, columnBody).pipe(catchError(() => of(null)));
  }
}
