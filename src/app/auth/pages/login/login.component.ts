import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginRequestModel } from '../../models/user.model';
import { AuthHttpService } from '../../services/auth-http.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  public authForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  constructor(private router: Router, private fb: FormBuilder, private authService: AuthHttpService) {}

  public onSignIn() {
    // this.router.navigateByUrl('');
    const user: LoginRequestModel = {
      login: this.authForm.value.email,
      password: this.authForm.value.password,
    }
    console.log(user);
    
    // this.authService.signIn(user).subscribe(console.log);
  }

}
