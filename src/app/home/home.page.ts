import { Component, OnInit } from '@angular/core';
import { List } from '../models/list';
import { ListService } from '../services/list.service';
import { ModalController } from '@ionic/angular';
import { CreateListComponent } from '../modals/create-list/create-list.component';
import { Router } from '@angular/router';
import { AuthentificationService } from '../services/authentification.service';
import { Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  public listsOwned: Observable<List[]>;
  public listsRead: Observable<List[]>;
  public listsWrite: Observable<List[]>;


  constructor(private listService: ListService,
     public modalController: ModalController,
     public translate: TranslateService,
     public authService : AuthentificationService) {
  }

  ngOnInit(){
    const queryObs = this.listService.getAllListsOfUser()
    //this.lists = queryObs.
    this.listsOwned = this.listService.listsOwned
    this.listsRead = this.listService.listsRead
    this.listsWrite = this.listService.listsWrite
   // this.lists = this.listService.getAllListsOfUser()
    this.translate.use('fr');
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
