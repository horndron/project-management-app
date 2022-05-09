import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  catchError, Observable, tap, throwError,
} from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProgressService } from '../services/progress/progress.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  constructor(private progressService: ProgressService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.url.includes(environment.baseUrl)) {
      this.progressService.show();

      return next.handle(request).pipe(
        tap((event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            this.progressService.hide();
          }
        }),
        catchError((error) => {
          this.progressService.hide();
          return throwError(() => error);
        }),
      );
    }

    return next.handle(request);
  }
}
