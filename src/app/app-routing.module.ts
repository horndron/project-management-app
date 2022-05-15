import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ROUTES } from './constants/routes';

const routes: Routes = [
  {
    path: ROUTES.ROOT,
    loadChildren: () => import('./main-page/main-page.module').then((m) => m.MainPageModule),
    pathMatch: 'full',
  },
  {
    path: ROUTES.USER,
    loadChildren: () => import('./user/user.module').then((m) => m.UserModule),
  },
  {
    path: ROUTES.BOARDS,
    loadChildren: () => import('./boards/boards.module').then((m) => m.BoardsModule),
  },
  {
    path: '**',
    loadChildren: () => import('./not-found/not-found.module').then((m) => m.NotFoundModule),
    redirectTo: ROUTES.NOT_FOUND,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
