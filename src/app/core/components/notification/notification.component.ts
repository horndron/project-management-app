import { Component, OnDestroy, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';

import { NotificationService } from '../../services/notification/notification.service';

@Component({
  selector: 'rsm-notification',
  templateUrl: './notification.component.html',
  providers: [MessageService],
})
export class NotificationComponent implements OnDestroy, OnInit {
  private notifications: Subscription;

  constructor(
    private readonly messageService: MessageService,
    private readonly notificationService: NotificationService,
  ) {}

  ngOnInit(): void {
    this.notifications = this.notificationService.notifications$.subscribe((notification) => {
      this.messageService.add(notification);
    });
  }

  ngOnDestroy(): void {
    this.notifications.unsubscribe();
  }
}
