import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { CreateTodoComponent } from 'src/app/modals/create-todo/create-todo.component';
import { UpdateTodoComponent } from 'src/app/modals/update-todo/update-todo.component';
import { List } from 'src/app/models/list';
import { Todo } from 'src/app/models/todo';
import { ListService } from 'src/app/services/list.service';

@Component({
  selector: 'app-list-details',
  templateUrl: './list-details.page.html',
  styleUrls: ['./list-details.page.scss'],
})
export class ListDetailsPage implements OnInit {

  list : List
  constructor(private listeService : ListService,
      private modalController : ModalController,
      private actRoute :ActivatedRoute) { }

  ngOnInit() {
    const listId=this.actRoute.snapshot.paramMap.get('listId')
    this.list=this.listeService.getOne(listId)
  }
  async presentModal() {
    const modal = await this.modalController.create({
      component: CreateTodoComponent,
      componentProps : {
        'listId' : this.list.id
      }
    });
    return await modal.present();
  }

  delete (todo:Todo) {
    this.listeService.deleteTodo(this.list,todo)
  }

  
}
