import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { Message } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private readonly notificationSubject = new ReplaySubject<Message>(1);

  constructor(private readonly translateService: TranslateService) {}

  success(message: string, summary?: string): void {
    this.notificationSubject.next({
      severity: 'success',
      summary: summary || this.translateService.instant('NOTIFICATION.SUCCESS'),
      detail: message,
    });
  }

  error(message: string, summary?: string): void {
    this.notificationSubject.next({
      severity: 'error',
      summary: summary || this.translateService.instant('NOTIFICATION.ERROR'),
      detail: message,
    });
  }

  warn(message: string, summary?: string): void {
    this.notificationSubject.next({
      severity: 'warn',
      summary: summary || this.translateService.instant('NOTIFICATION.WARN'),
      detail: message,
    });
  }

  get notifications$(): Observable<Message> {
    return this.notificationSubject.asObservable();
  }
}
