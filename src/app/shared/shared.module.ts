import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { PasswordModule } from 'primeng/password';
import { SplitButtonModule } from 'primeng/splitbutton';
import { SpeedDialModule } from 'primeng/speeddial';
import { PickListModule } from 'primeng/picklist';
import { CardModule } from 'primeng/card';
import { PanelModule } from 'primeng/panel';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { DragDropModule } from 'primeng/dragdrop';
import { RippleModule } from 'primeng/ripple';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    CheckboxModule,
    InputSwitchModule,
    InputTextModule,
    InputTextareaModule,
    PasswordModule,
    SplitButtonModule,
    SpeedDialModule,
    PickListModule,
    CardModule,
    PanelModule,
    MessagesModule,
    MessageModule,
    ToastModule,
    DragDropModule,
    RippleModule,
  ],
  exports: [
    ReactiveFormsModule,
    ButtonModule,
    CheckboxModule,
    InputSwitchModule,
    InputTextModule,
    InputTextareaModule,
    PasswordModule,
    SplitButtonModule,
    SpeedDialModule,
    PickListModule,
    CardModule,
    PanelModule,
    MessagesModule,
    MessageModule,
    ToastModule,
    DragDropModule,
    RippleModule,
  ],
})
export class SharedModule { }
