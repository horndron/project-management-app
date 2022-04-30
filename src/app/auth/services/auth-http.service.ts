import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  HttpMethod, LoginRequestModel, UrlPath, LoginResponseModel,
} from '../models/user.model';

const BASE_URL = 'http://localhost:4000/';

@Injectable()
export class AuthHttpService {
  private headers = new HttpHeaders({
    'accept': 'application/json',
    'Content-Type': 'application/json',
  });

  constructor(private http: HttpClient) {}

  public signIn(user: LoginRequestModel): Observable<LoginResponseModel> {
    return this.http.post<LoginResponseModel>(`${BASE_URL}${UrlPath.SIGNIN}`, {
      method: HttpMethod.GET,
      headers: this.headers,
      body: JSON.stringify(user),
    });
  }

  public createUser(user: LoginRequestModel): Observable<LoginResponseModel> {
    return this.http.post<LoginResponseModel>(`${BASE_URL}${UrlPath.SIGNUP}`, {
      method: HttpMethod.POST,
      headers: this.headers,
      body: JSON.stringify(user),
    });
  }
}
