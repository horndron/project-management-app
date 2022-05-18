import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BoardsPageComponent } from './pages/boards-page/boards-page.component';
import { ROUTES } from '../constants/routes';
import { BoardColumnComponent } from './componets/board-colunm/board-column.component';

const routes: Routes = [
  {
    path: ROUTES.ROOT,
    component: BoardsPageComponent,
  },
  {
    path: ':id',
    component: BoardColumnComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BoardsRoutingModule {}
