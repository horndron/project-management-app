import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  catchError,
  map,
  Observable,
  of,
} from 'rxjs';

import { Nullable } from 'src/app/models/core';
import { Column } from '../../../models/column';
import { environment } from '../../../../environments/environment';
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
}
