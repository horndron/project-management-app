import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { PATHES } from './user.constants';

const routes: Routes = [
  { path: PATHES.ROOT, redirectTo: PATHES.LOGIN },
  { path: PATHES.LOGIN, component: LoginComponent },
  { path: PATHES.SIGNUP, component: SignUpComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
