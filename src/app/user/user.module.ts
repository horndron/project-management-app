import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { LoginComponent } from './pages/login/login.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { UserRoutingModule } from './user-routing.module';
import { UserHttpService } from './services/user-http.service';
import { EmailComponent } from './components/email/email.component';
import { PasswordComponent } from './components/password/password.component';
import { EditComponent } from './pages/edit/edit.component';
import { UserFormComponent } from './components/user-form/user-form.component';

@NgModule({
  declarations: [
    LoginComponent,
    SignUpComponent,
    EmailComponent,
    PasswordComponent,
    EditComponent,
    UserFormComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule,
    UserRoutingModule,
    ProgressSpinnerModule,
    TranslateModule.forChild(),
  ],
  providers: [
    UserHttpService,
  ],
})
export class UserModule { }
