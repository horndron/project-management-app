import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ROUTES } from '../constants/routes';
import { AuthGuard } from '../core/guards/auth.guard';
import { EditComponent } from './pages/edit/edit.component';
import { LoginComponent } from './pages/login/login.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';

const routes: Routes = [
  { path: ROUTES.ROOT, redirectTo: ROUTES.LOGIN },
  { path: ROUTES.LOGIN, component: LoginComponent },
  { path: ROUTES.SIGNUP, component: SignUpComponent },
  { path: ROUTES.EDIT, component: EditComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
