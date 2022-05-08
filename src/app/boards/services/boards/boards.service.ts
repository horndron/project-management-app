import { Board } from 'src/app/models/board';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  catchError,
  Observable,
  of,
  switchMap,
} from 'rxjs';

import { environment } from '../../../../environments/environment';
import { Nullable } from '../../../models/core';

@Injectable({
  providedIn: 'root',
})
export class BoardsService {
  private readonly entityName = 'boards';

  constructor(private readonly http: HttpClient) {}

  getAll$(): Observable<Board[]> {
    return this.http.get<Board[]>(`${environment.baseUrl}${this.entityName}`).pipe(catchError(() => of([])));
  }

  create$(board: Partial<Board>): Observable<Nullable<Board>> {
    return this.http.post<Board>(`${environment.baseUrl}${this.entityName}`, board).pipe(catchError(() => of(null)));
  }

  delete$(id: string): Observable<string> {
    return this.http.delete<void>(`${environment.baseUrl}${this.entityName}/${id}`).pipe(
      switchMap(() => of(id)),
      catchError(() => of('')),
    );
  }
}
