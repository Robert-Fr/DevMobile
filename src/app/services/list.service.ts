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

  deleteTodo(todoList : List,todo:Todo){
    const actList : List =this.list[this.list.indexOf(todoList)] //on récupère une référence sur la liste de laquelle on veut enlever un todo
    actList.todos.splice(actList.todos.indexOf(todo),1) //on supprimme le todo
  }

  getTodo(listId : string ,todoId : string ):Todo{
    console.log("finding todo in : "+listId+ " and todoid: "+todoId)
    return this.getOne(listId).todos.find(el=>el.id === todoId)
  }
  updateTodo(listId : string, todoId:string,name:string,desc:string,isDone:boolean){
    const todo:Todo = this.getTodo(listId,todoId)
    todo.name=name
    todo.isDone=isDone
    todo.description=desc
  }
}
