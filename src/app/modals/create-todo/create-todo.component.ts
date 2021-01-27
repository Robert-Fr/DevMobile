import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Todo } from 'src/app/models/todo';
import { ListService } from 'src/app/services/list.service';

@Component({
  selector: 'app-create-todo',
  templateUrl: './create-todo.component.html',
  styleUrls: ['./create-todo.component.scss'],
})
export class CreateTodoComponent implements OnInit {
  todoForm : FormGroup
  @Input() listId: string

  constructor(private modalController: ModalController,
    private listService:ListService,
    private actRoute :ActivatedRoute,
    private fb : FormBuilder) { }

  ngOnInit() {
    this.todoForm = this.fb.group ({
      todoName : ['',[Validators.required,Validators.minLength(3)]],
      todoDescription :  ['',[Validators.required,Validators.maxLength(255)]]
    })
  }

//Called when user clicks on the Add button
  onCreate(){
    if(this.todoForm.valid){
      const listId=this.actRoute.snapshot.paramMap.get('id')
      this.listService.addTodo(listId,new Todo(this.todoForm.get('todoName').value,this.todoForm.get('todoDescription').value));
      //Une fois le todo crée on réaffiche la page normalement
      this.dismiss();
    }
  }
  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true
    });
  }
  get errorControl(){
    return this.todoForm.controls
  }
  
}
