import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { BoardsRoutingModule } from './boards-routing.module';
import { BoardElementComponent } from './componets/board-element/board-element.component';
import { BoardsPageComponent } from './pages/boards-page/boards-page.component';
import { CreateBoardDialogComponent } from './componets/create-board-dialog/create-board-dialog.component';
import { BoardColumnComponent } from './componets/board-colunm/board-column.component';
import { TaskComponent } from './componets/task/task.component';
import { BoardDetailsComponent } from './pages/board-details/board-details.component';
import { TaskSortingOrderPipe } from './pipes/task-sorting-order.pipe';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { CreateColumnDialogComponent } from './componets/create-column-dialog/create-column-dialog.component';

@NgModule({
  declarations: [
    BoardElementComponent,
    BoardsPageComponent,
    CreateBoardDialogComponent,
    BoardColumnComponent,
    TaskComponent,
    BoardDetailsComponent,
    TaskSortingOrderPipe,
    SearchPageComponent,
    CreateColumnDialogComponent,
  ],
  imports: [
    CommonModule,
    DialogModule,
    BoardsRoutingModule,
    ButtonModule,
    CardModule,
    ReactiveFormsModule,
    ProgressSpinnerModule,
    TranslateModule,
    InputTextModule,
    DragDropModule,
    FormsModule,
  ],
})
export class BoardsModule { }
