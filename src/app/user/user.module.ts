import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './pages/login/login.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { UserRoutingModule } from './user-routing.module';
import { UserHttpService } from './services/user-http.service';
import { EmailComponent } from './components/email/email.component';
import { PasswordComponent } from './components/password/password.component';

@NgModule({
  declarations: [
    LoginComponent,
    SignUpComponent,
    EmailComponent,
    PasswordComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule,
    UserRoutingModule,
  ],
  providers: [
    UserHttpService,
  ]
})
export class UserModule { }
