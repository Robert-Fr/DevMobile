import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListDetailsPage } from './list-details.page';

const routes: Routes = [
  {
    path: '',
    component: ListDetailsPage
  },{
    path : 'todo-details/:todoId',
    loadChildren: () => import('../../pages/todo-details/todo-details.module').then( m => m.TodoDetailsPageModule),
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListDetailsPageRoutingModule {}
