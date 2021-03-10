import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CreateTodoComponent } from 'src/app/modals/create-todo/create-todo.component';
import { ListService } from 'src/app/services/list.service';
import { List } from 'src/app/models/list';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-list-details',
  templateUrl: './list-details.page.html',
  styleUrls: ['./list-details.page.scss'],
})
export class ListDetailsPage implements OnInit {
  private list:Observable<List>
  private listId : string
  private isWritable : Observable<boolean>
  private isReadOnly : Observable<boolean>
  private isOwned : Observable<boolean>

  constructor(private listService: ListService, private modalController: ModalController, private route: ActivatedRoute) {
   }

  ngOnInit() {
    this.listId = this.route.snapshot.paramMap.get('listId');
    this.list = this.listService.getOne(this.listId)
    this.list.subscribe(l => this.isOwned=this.listService.isOwned(l))
    this.list.subscribe(l => this.isReadOnly = this.listService.isReadOnly(l))
    this.list.subscribe(l => this.isWritable = this.listService.isWritable(l))
  }

  async openCreateModal(){
    const modal = await this.modalController.create({
      component: CreateTodoComponent,
      componentProps: {
        'listId': this.listId
      }
    });
    return await modal.present();
  }

  delete(todo){
      this.listService.deleteTodo(todo, this.listId);
  }

}
