import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  catchError,
  map,
  Observable,
  of,
} from 'rxjs';

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

  getAll$(boardId: string): Observable<Column[]> {
    return this.http.get<Column[]>(`${environment.baseUrl}${EntityPaths.Boards}/${boardId}/${EntityPaths.Columns}`)
      .pipe(catchError(() => of([])));
  }
}
