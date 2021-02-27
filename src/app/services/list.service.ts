import { Injectable } from '@angular/core';
import { List } from '../models/list';
import { Todo } from '../models/todo';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Test } from '../models/test';
import { AuthentificationService } from './authentification.service';

@Injectable({
  providedIn: 'root'
})
export class ListService {
  public old_list : List[]
  public lists: Observable<List[]>;
  private listsCollection: AngularFirestoreCollection<List>;

  constructor(private afs : AngularFirestore,
    private authService : AuthentificationService) { 
    this.listsCollection=afs.collection<List>('Lists')
    this.lists= this.listsCollection.valueChanges({ idField: 'customID' })
  }

  getAll(){
    return this.lists;
  }

  async getOne(id: string) {
    const test = this.listsCollection.doc(id);
    return test.get();
    //return this.afs.collection('Lists', ref => ref.where('id', '==', 'large'))
  }

  create(list: List){
    if(this.authService.userCredential){
      this.listsCollection.add({...list})
    }
  }

  addTodo(todo: Todo, listId: string){
    //this.getOne(listId).todos.push(todo);
  }

  deleteTodo(todo: Todo, listId: string){
    const list = this.getOne(listId);
    //list.todos.splice(list.todos.indexOf(todo), 1);
  }

  delete(list){
    this.old_list.splice(this.old_list.indexOf(list), 1);
  }
}
