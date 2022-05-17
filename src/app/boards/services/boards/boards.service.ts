import { map } from 'rxjs/operators';
import { Board } from 'src/app/models/board';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  catchError,
  Observable,
  of,
} from 'rxjs';

import { environment } from '../../../../environments/environment';
import { Nullable } from '../../../models/core';
import { EntityPaths } from '../../../constants/api';

@Injectable({
  providedIn: 'root',
})
export class BoardsService {
  private readonly entityName = 'boards';

  constructor(private readonly http: HttpClient) {}

  getAll$(): Observable<Board[]> {
    return this.http.get<Board[]>(`${environment.baseUrl}${EntityPaths.Boards}`).pipe(catchError(() => of([])));
  }

  create$(board: Partial<Board>): Observable<Nullable<Board>> {
    return this.http.post<Board>(`${environment.baseUrl}${EntityPaths.Boards}`, board).pipe(catchError(() => of(null)));
  }

  remove$(id: string): Observable<string> {
    return this.http.delete<void>(`${environment.baseUrl}${EntityPaths.Boards}/${id}`).pipe(
      map(() => id),
      catchError(() => of('')),
    );
  }

  getOne$(id: string): Observable<Board> {
    return this.http.get<Board>(`${environment.baseUrl}${EntityPaths.Boards}/${id}`);
  }

  changeOne$(id: string, board: Partial<Board>): Observable<Nullable<Board>> {
    return this.http.put<Board>(`${environment.baseUrl}${EntityPaths.Boards}/${id}`, board).pipe(catchError(() => of(null)));
  }
}
