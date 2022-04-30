import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './pages/login/login.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthHttpService } from './services/auth-http.service';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
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
    AuthRoutingModule,
  ],
  providers: [
    AuthHttpService,
  ]
})
export class AuthModule { }
