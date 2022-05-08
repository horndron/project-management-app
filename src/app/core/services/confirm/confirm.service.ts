import { TranslateService } from '@ngx-translate/core';
import { Injectable } from '@angular/core';
import { ConfirmationService, ConfirmEventType } from 'primeng/api';

import { NotificationService } from '../notification/notification.service';

@Injectable({
  providedIn: 'root',
})
export class ConfirmService {
  constructor(
    private readonly notificationService: NotificationService,
    private readonly confirmationService: ConfirmationService,
    private readonly translateService: TranslateService,
  ) { }

  private reject(type: ConfirmEventType) {
    switch (type) {
      case ConfirmEventType.REJECT:
        this.notificationService.error(
          this.translateService.instant('MESSAGES.REJECT'),
          this.translateService.instant('NOTIFICATION.REJECT'),
        );
        break;
      case ConfirmEventType.CANCEL:
        this.notificationService.warn(
          this.translateService.instant('MESSAGES.CANCEL'),
          this.translateService.instant('NOTIFICATION.CANCEL'),
        );
        break;
      default:
    }
  }

  delete(deleteHandler: () => void) {
    this.confirmationService.confirm({
      message: this.translateService.instant('MESSAGES.DELETE'),
      header: this.translateService.instant('HEADERS.DELETE'),
      icon: 'pi pi-info-circle',
      accept: () => {
        deleteHandler();
      },
      reject: (type: ConfirmEventType) => {
        this.reject(type);
      },
    });
  }
}
