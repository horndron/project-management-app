import { Component, OnInit } from '@angular/core';
import { Message, MessageService } from 'primeng/api';

import { NotificationService } from '../../services/notification/notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  providers: [MessageService],
})
export class NotificationComponent implements OnInit {
  constructor(
    private readonly messageService: MessageService,
    private readonly notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.notificationService.notifications$.subscribe((notification: Notification) => {
      this.messageService.add(notification);
    });
  }
}
