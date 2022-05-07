import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  catchError, Observable, throwError,
} from 'rxjs';
import * as UserSelectors from '../../user/store/user.selectors';

enum AuthPath {
  Users = 'users',
  Boards = 'boards',
}

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private readonly currentUser$ = this.store.select(UserSelectors.selectCurrentUser);

  constructor(
    private readonly router: Router,
    private readonly store: Store,
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let newRequest = request.clone();

    if (request.url.includes(AuthPath.Users) || request.url.includes(AuthPath.Boards)) {
      this.currentUser$.subscribe((user) => {
        if (user?.token !== '') {
          newRequest = request.clone({
            setHeaders: { Authorization: `Bearer ${user?.token}` },
          });
        }
      });
    }

    return next.handle(newRequest).pipe(
      catchError((err) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            this.router.navigate(['/user', 'login']);
          }
        }
        return throwError(() => err);
      }),
    );
  }
}
