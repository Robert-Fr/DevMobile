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
  public lists: Observable<List[]>;


  constructor(private listService: ListService,
     public modalController: ModalController,
     public translate: TranslateService,
     public authService : AuthentificationService) {
  }

  ngOnInit(){
    /*const queryObs = this.listService.getAllListsOfUser()
    this.lists = queryObs.
    owned.next(this.authService.userCredential.user.uid);*/
    this.translate.use('en');
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
