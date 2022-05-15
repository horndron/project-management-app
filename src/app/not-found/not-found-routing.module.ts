import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ROUTES } from '../constants/routes';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';

const routes: Routes = [
  {
    path: ROUTES.ROOT,
    component: NotFoundPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotFoundRoutingModule {}
