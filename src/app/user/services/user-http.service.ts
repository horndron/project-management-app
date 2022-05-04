import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  LoginRequestModel, LoginResponseModel,
} from '../models/user.models';
import { UrlPath } from '../user.constants';

const BASE_URL = environment.baseUrl;

@Injectable({
  providedIn: 'root',
})
export class UserHttpService {
  private readonly httpHeader = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  public signIn(user: LoginRequestModel): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${BASE_URL}${UrlPath.SIGNIN}`, user, this.httpHeader);
      // .pipe(
      //   tap((response) => this.handleLoginResponse(response.token, user)),
      //   catchError((error) => this.handleError(error)),
      // );
  }

  public createUser(user: LoginRequestModel): Observable<LoginResponseModel> {
    return this.http.post<LoginResponseModel>(`${BASE_URL}${UrlPath.SIGNUP}`, user, this.httpHeader);
      // .pipe(
      //   tap((response) => this.handleRegisterResponse(response)),
      //   catchError((error) => this.handleError(error)),
      // );
  }

  public getAllUsers(token: string): Observable<LoginResponseModel[]> {
    const authHeader = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    };
    return this.http.get<LoginResponseModel[]>(`${BASE_URL}${UrlPath.USERS}`, authHeader);
  }

  // private handleRegisterResponse(user: LoginResponseModel): void {
  //   this.store.dispatch(UserActions.RegisterUser({ user }));
  // }

  // private handleLoginResponse(token: string, currentUser: LoginRequestModel): void {
  //   this.getAllUsers(token).pipe(
  //     map((users) => users.find((user) => user.login === currentUser.login)),
  //   ).subscribe((userData) => {
  //     if (userData) {
  //       this.store.dispatch(UserActions.LoginUserSuccess({
  //         userInfo: {
  //           user: userData,
  //           token,
  //         },
  //       }));
  //     }
  //   });
  // }

  // private handleError(error: HttpErrorResponse): Observable<HttpErrorResponse> {
  //   this.store.dispatch(UserActions.FetchUserFailed());
  //   return throwError(() => error);
  // }
}
