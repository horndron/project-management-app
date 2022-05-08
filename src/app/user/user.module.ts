import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { LoginComponent } from './pages/login/login.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { UserRoutingModule } from './user-routing.module';
import { UserHttpService } from './services/user-http.service';
import { EmailComponent } from './components/email/email.component';
import { PasswordComponent } from './components/password/password.component';
import { EditComponent } from './pages/edit/edit.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { NameComponent } from './components/name/name.component';

@NgModule({
  declarations: [
    LoginComponent,
    SignUpComponent,
    EmailComponent,
    PasswordComponent,
    EditComponent,
    UserFormComponent,
    NameComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule,
    UserRoutingModule,
    ProgressSpinnerModule,
    ButtonModule,
    RippleModule,
    InputTextModule,
    PasswordModule,
    TranslateModule.forChild(),
  ],
  providers: [
    UserHttpService,
  ],
})
export class UserModule { }
