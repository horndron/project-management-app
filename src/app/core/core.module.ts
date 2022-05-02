import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { RouterModule } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { AuthGuard } from './guards/auth.guard';
import { HeaderComponent } from './components/header/header.component';
import { SelectLanguageComponent } from './components/select-language/select-language.component';
import { FooterComponent } from './components/footer/footer.component';
import { SearchComponent } from './components/search/search.component';
import { UserInformationComponent } from './components/user-information/user-information.component';

import { NotificationComponent } from './components/notification/notification.component';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';

@NgModule({
  declarations: [
    HeaderComponent,
    SelectLanguageComponent,
    FooterComponent,
    SearchComponent,
    UserInformationComponent,
    NotificationComponent,
    ConfirmationDialogComponent,
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
  ],
  exports: [
    HeaderComponent,
    SelectLanguageComponent,
    FooterComponent,
  ],
  providers: [AuthGuard],
})
export class CoreModule { }
