import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Todo } from 'src/app/models/todo';
import { ListService } from 'src/app/services/list.service';

@Component({
  selector: 'app-update-todo',
  templateUrl: './update-todo.component.html',
  styleUrls: ['./update-todo.component.scss'],
})
export class UpdateTodoComponent implements OnInit {

  @Input() listId: string
  @Input() todoId: string
  todo : Todo
  updateTodoForm : FormGroup
  constructor(private listService : ListService,
    private modalController : ModalController,
    private fb : FormBuilder) { }

  ngOnInit() {
    this.todo=this.listService.getTodo(this.listId,this.todoId)
    this.updateTodoForm=this.fb.group({
      'todoName' : [this.todo.name,[Validators.required,Validators.minLength(3)]],
      'todoDescription' : [this.todo.description,[Validators.required]],
      'todoIsDone' : [this.todo.isDone]
    })
  }

  dismiss(){
    this.modalController.dismiss({
      'dismissed': true
    })
  }
  onUpdate(){
    if(this.updateTodoForm.valid){
      const name = this.updateTodoForm.get('todoName').value
      const desc = this.updateTodoForm.get('todoDescription').value
      const isDone = this.updateTodoForm.get('todoIsDone').value
      this.listService.updateTodo(this.listId,this.todoId,name,desc,isDone)
      this.dismiss()
    }
  }
  get errorControl(){
    return this.updateTodoForm.controls
  }
}
