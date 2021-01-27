import { Injectable } from '@angular/core';
import { List } from '../models/list';
import { Todo } from '../models/todo';

@Injectable({
  providedIn: 'root'
})
export class ListService {
  list:List[];

  constructor() {
    this.list=[];
   }

  getAll():List[] {
    return this.list;
  }

  getOne(id:string):List{
    return this.list.find(el=>el.id===id);
  }

  create(list:List) {
    this.list.push(list);
  }
  delete (list:List){
    this.list.splice(this.list.indexOf(list),1)
  }
  addTodo(id:string,todo:Todo){
    this.getOne(id).todos.push(todo)
  }
}
