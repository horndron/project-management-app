import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BoardDetailsComponent } from './pages/board-details/board-details.component';
import { BoardsPageComponent } from './pages/boards-page/boards-page.component';
import { ROUTES } from '../constants/routes';

const routes: Routes = [
  {
    path: ROUTES.ROOT,
    component: BoardsPageComponent,
  },
  {
    path: ':id',
    component: BoardDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BoardsRoutingModule {}
