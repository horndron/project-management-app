import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PATHES } from './app.constants';

const routes: Routes = [
  { path: PATHES.USER, loadChildren: () => import('./user/user.module').then((m) => m.UserModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
