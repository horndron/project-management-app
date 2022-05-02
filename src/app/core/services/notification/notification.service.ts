import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { Message } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private readonly notificationSubject = new ReplaySubject<Message>(1);

  success(message: string, summary?: string): void {
    this.notificationSubject.next({
      severity: 'success',
      summary: summary || 'Успех!',
      detail: message,
    });
  }

  error(message: string, summary?: string): void {
    this.notificationSubject.next({
      severity: 'error',
      summary: summary || 'Ошибка!',
      detail: message,
    });
  }

  warn(message: string, summary?: string): void {
    this.notificationSubject.next({
      severity: 'warn',
      summary: summary || 'Предупреждение!',
      detail: message,
    });
  }

  get notifications$(): Observable<any> {
    return this.notificationSubject.asObservable();
  }
}
