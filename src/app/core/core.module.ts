import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { RouterModule } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
<<<<<<< HEAD
import { DragDropModule } from '@angular/cdk/drag-drop';
=======
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

import { ConfirmationService as PrimeConfirmationService } from 'primeng/api';
import { NotificationComponent } from './components/notification/notification.component';
>>>>>>> develop
import { AuthGuard } from './guards/auth.guard';
import { HeaderComponent } from './components/header/header.component';
import { SelectLanguageComponent } from './components/select-language/select-language.component';
import { FooterComponent } from './components/footer/footer.component';
import { SearchComponent } from './components/search/search.component';
import { UserInformationComponent } from './components/user-information/user-information.component';
<<<<<<< HEAD
import { BoardColunmComponent } from './components/board-colunm/board-colunm.component';
import { TaskComponent } from './components/task/task.component';
=======
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
>>>>>>> develop

@NgModule({
  declarations: [
    HeaderComponent,
    SelectLanguageComponent,
    FooterComponent,
    SearchComponent,
    UserInformationComponent,
<<<<<<< HEAD
    BoardColunmComponent,
    TaskComponent,
=======
    NotificationComponent,
    ConfirmationDialogComponent,
>>>>>>> develop
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    TranslateModule,
    DropdownModule,
    ButtonModule,
    RippleModule,
    InputTextModule,
<<<<<<< HEAD
    DragDropModule,
=======
    ToastModule,
    ConfirmDialogModule,
>>>>>>> develop
  ],
  exports: [
    HeaderComponent,
    SelectLanguageComponent,
    FooterComponent,
    ConfirmationDialogComponent,
    NotificationComponent,
  ],
  providers: [
    AuthGuard,
    PrimeConfirmationService,
  ],
})
export class CoreModule { }
