import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { BoardsRoutingModule } from './boards-routing.module';
import { BoardElementComponent } from './componets/board-element/board-element.component';
import { BoardsPageComponent } from './pages/boards-page/boards-page.component';
import { CreateBoardDialogComponent } from './componets/create-board-dialog/create-board-dialog.component';
import { BoardColunmComponent } from './componets/board-colunm/board-colunm.component';
import { TaskComponent } from './componets/task/task.component';

@NgModule({
  declarations: [
    BoardElementComponent,
    BoardsPageComponent,
    CreateBoardDialogComponent,
    BoardColunmComponent,
    TaskComponent,
  ],
  imports: [
    CommonModule,
    DialogModule,
    BoardsRoutingModule,
    ButtonModule,
    CardModule,
    ReactiveFormsModule,
    TranslateModule,
    InputTextModule,
    DragDropModule,
  ],
})
export class BoardsModule { }
