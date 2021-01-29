import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { UpdateTodoComponent } from 'src/app/modals/update-todo/update-todo.component';
import { Todo } from 'src/app/models/todo';
import { ListService } from 'src/app/services/list.service';

@Component({
  selector: 'app-todo-details',
  templateUrl: './todo-details.page.html',
  styleUrls: ['./todo-details.page.scss'],
})
export class TodoDetailsPage implements OnInit {

  listId : string 
  todoId : string
  todo : Todo
  constructor(private listService: ListService,
      private actRoute : ActivatedRoute,
      private modalController : ModalController) { }

  ngOnInit() {
    this.listId = this.actRoute.snapshot.paramMap.get('listId')
    this.todoId = this.actRoute.snapshot.paramMap.get('todoId')
    this.todo = this.listService.getTodo(this.listId,this.todoId)
  }

  async presentUpdateModal() {
    const modal = await this.modalController.create({
      component: UpdateTodoComponent ,
      componentProps : {
        'listId' : this.listId,
        'todoId' : this.todoId
      }
    });
    return await modal.present();
  }
}
