import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  catchError, map, Observable, tap, throwError,
} from 'rxjs';
import {
  LoginRequestModel, UrlPath, LoginResponseModel,
} from '../models/user.model';
import * as UserActions from '../store/user.actions';

const BASE_URL = 'https://vast-bayou-93084.herokuapp.com/';

@Injectable()
export class AuthHttpService {
  private httpHeader = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient, private store: Store) {}

  public signIn(user: LoginRequestModel): Observable<{ token: string } | HttpErrorResponse> {
    return this.http.post<{ token: string }>(`${BASE_URL}${UrlPath.SIGNIN}`, user, this.httpHeader)
      .pipe(
        tap((response) => this.handleLoginResponse(response.token, user)),
        catchError((error) => this.handleError(error)),
      );
  }

  public createUser(user: LoginRequestModel): Observable<LoginResponseModel | HttpErrorResponse> {
    return this.http.post<LoginResponseModel>(`${BASE_URL}${UrlPath.SIGNUP}`, user, this.httpHeader)
      .pipe(
        tap((response) => this.handleRegisterResponse(response)),
        catchError((error) => this.handleError(error)),
      );
  }

  private getAllUsers(token: string): Observable<LoginResponseModel[]> {
    const authHeater = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    };
    return this.http.get<LoginResponseModel[]>(`${BASE_URL}${UrlPath.USERS}`, authHeater);
  }

  private handleRegisterResponse(user: LoginResponseModel): void {
    this.store.dispatch(UserActions.RegisterUser({ user }));
  }

  private handleLoginResponse(token: string, currentUser: LoginRequestModel): void {
    this.getAllUsers(token).pipe(
      map((users) => users.find((user) => user.login === currentUser.login)),
    ).subscribe((userData) => {
      if (userData) {
        this.store.dispatch(UserActions.LoginUserSuccess({
          userInfo: {
            user: userData,
            token,
          },
        }));
      }
    });
  }

  private handleError(error: HttpErrorResponse): Observable<HttpErrorResponse> {
    this.store.dispatch(UserActions.FetchUserFailed());
    return throwError(() => error);
  }
}
