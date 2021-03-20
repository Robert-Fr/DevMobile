import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListDetailsPageRoutingModule } from './list-details-routing.module';

import { ListDetailsPage } from './list-details.page';
import { CreateTodoComponent } from 'src/app/modals/create-todo/create-todo.component';
import { TranslateModule } from '@ngx-translate/core';
import { MenuComponent } from 'src/app/menu/menu.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    TranslateModule,
    ListDetailsPageRoutingModule
  ],
  declarations: [ListDetailsPage, CreateTodoComponent, MenuComponent]
})
export class ListDetailsPageModule {}
