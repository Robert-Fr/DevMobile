import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CreateListComponent } from '../modals/create-list/create-list.component';
import { List } from '../models/list';
import { ListService } from '../services/list.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  lists : List[];

  constructor(private listService : ListService,
    public modalController: ModalController) {}

  ngOnInit() {
    this.lists=this.listService.getAll() ;
  }

  delete(list:List){
    this.listService.delete(list)
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: CreateListComponent
    });
    return await modal.present();
  }

}
