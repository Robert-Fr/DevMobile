import { Component, OnInit } from '@angular/core';
import { List } from '../models/list';
import { ListService } from '../services/list.service';
import { ModalController } from '@ionic/angular';
import { CreateListComponent } from '../modals/create-list/create-list.component';
import { Router } from '@angular/router';
import { AuthentificationService } from '../services/authentification.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  public lists: Observable<List[]>;


  constructor(private listService: ListService,
     public modalController: ModalController,
     public authService : AuthentificationService) {
  }

  ngOnInit(){
    this.lists = this.listService.getAll();
  }

  async openCreateModal(){
    const modal = await this.modalController.create({
      component: CreateListComponent,
    });
    return await modal.present();
  }

  async delete(list){
    this.listService.delete(list);
  }

  public signOut() : void {
    this.authService.signOut();
  }
}
