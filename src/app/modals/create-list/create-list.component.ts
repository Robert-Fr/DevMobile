import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { List } from 'src/app/models/list';
import { ListService } from 'src/app/services/list.service';

@Component({
  selector: 'app-create-list',
  templateUrl: './create-list.component.html',
  styleUrls: ['./create-list.component.scss'],
})
export class CreateListComponent implements OnInit {

  //list : List=null;
  listForm : FormGroup

  constructor(private listService:ListService,
    private modalController: ModalController,
    private fb : FormBuilder) { }

  ngOnInit() {
    //this.list = {name: "",todos:[],id:0};
    this.listForm = this.fb.group({
      listName : ['',Validators.required]
    })
  }

  //Called when user clicks on the Add button
  onCreate(){
    if(this.listForm.valid){
      this.listService.create(new List(this.listForm.get('listName').value));
      //Une fois la liste crée on réaffiche la home page normalement
      this.dismiss();
    }
  }
  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
      console.log("dismiss modal")
    this.modalController.dismiss({
      'dismissed': true
    });

  }
  get errorControl(){
    return this.listForm.controls
  }

}
