import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ReactiveFormsModule } from '@angular/forms';

import { BoardsRoutingModule } from './boards-routing.module';
import { BoardElementComponent } from './componets/board-element/board-element.component';
import { BoardsPageComponent } from './pages/boards-page/boards-page.component';
import { CreateBoardDialogComponent } from './componets/create-board-dialog/create-board-dialog.component';

@NgModule({
  declarations: [
    BoardElementComponent,
    BoardsPageComponent,
    CreateBoardDialogComponent,
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
  ],
})
export class BoardsModule { }
