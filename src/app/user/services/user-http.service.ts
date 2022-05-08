import { HttpClient } from '@angular/common/http';
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
  constructor(private readonly http: HttpClient) {}

  public signIn(user: LoginRequestModel): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${BASE_URL}${UrlPath.SIGNIN}`, user);
  }

  public createUser(user: LoginRequestModel): Observable<LoginResponseModel> {
    return this.http.post<LoginResponseModel>(`${BASE_URL}${UrlPath.SIGNUP}`, user);
  }

  public getAllUsers(): Observable<LoginResponseModel[]> {
    return this.http.get<LoginResponseModel[]>(`${BASE_URL}${UrlPath.USERS}`);
  }

  public editUser(id: string, userInfo: LoginRequestModel): Observable<LoginResponseModel> {
    return this.http.put<LoginResponseModel>(`${BASE_URL}${UrlPath.USERS}/${id}`, userInfo);
  }

  public deleteUser(id: string): Observable<void> {
    return this.http.delete<void>(`${BASE_URL}${UrlPath.USERS}/${id}`);
  }
}
