import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TodoDetailsPageRoutingModule } from './todo-details-routing.module';

import { TodoDetailsPage } from './todo-details.page';
import { UpdateTodoComponent } from 'src/app/modals/update-todo/update-todo.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TodoDetailsPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [TodoDetailsPage,UpdateTodoComponent]
})
export class TodoDetailsPageModule {}
