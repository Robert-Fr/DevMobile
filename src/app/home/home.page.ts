import { Component, OnInit } from '@angular/core';
import { List } from '../models/list';
import { ListService } from '../services/list.service';
import { ModalController } from '@ionic/angular';
import { CreateListComponent } from '../modals/create-list/create-list.component';
import { Router } from '@angular/router';
import { AuthentificationService } from '../services/authentification.service';
import { Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import {Platform} from '@ionic/angular'

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  public listsOwned: Observable<List[]>;
  public listsRead: Observable<List[]>;
  public listsWrite: Observable<List[]>;
  public selectedType : number =1;
  public listsTypes : any[]=[]


  constructor(private listService: ListService,
     public modalController: ModalController,
     public translate: TranslateService,
     public authService : AuthentificationService,
     private platform:Platform) {
       this.platform.ready().then(() =>{
        this.listsTypes= [ 
        {id:1 , name: this.translate.instant('general.select_list_type.all') },
        {id:2 , name: this.translate.instant('general.select_list_type.owned')},
        {id:3 , name: this.translate.instant('general.select_list_type.write')},
        {id:4 , name: this.translate.instant('general.select_list_type.read')}
        ]
       }) 
       this.translate.get('general.select_list_type.all').subscribe((res: string) => {
        console.log(res);
        //=> 'hello world'
      })
      }

  ngOnInit(){
    const queryObs = this.listService.getAllListsOfUser()
    //this.lists = queryObs.
    this.listsOwned = this.listService.listsOwned
    this.listsRead = this.listService.listsRead
    this.listsWrite = this.listService.listsWrite
   // this.lists = this.listService.getAllListsOfUser()
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

  onTypeSelectorChange(event){
    console.log("type selected : "+event.target.value)
  }
}
