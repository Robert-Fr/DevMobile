import { Injectable } from '@angular/core';
import { List } from '../models/list';
import { Todo } from '../models/todo';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Test } from '../models/test';
import { AuthentificationService } from './authentification.service';
import { map, switchMap, tap } from 'rxjs/operators';

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

  getOne(id: string) {

      return this.listsCollection
      .doc<List>(id)
      .valueChanges()
      .pipe(
        switchMap(list =>
          this.listsCollection
            .doc(id)
            .collection<Todo>('todos')
            .snapshotChanges()
            .pipe(
              map(actions => {
                list.todos = this.converSnapshotData<Todo>(actions)
                return list;
              })
            )
        )
      )
    
  }

  create(list: List){
    if(this.authService.userCredential){
      this.listsCollection.add({...list})
    }
  }

  addTodo(todo: Todo, listId: string){
    this.afs.collection<List>('Lists')
      .doc(listId)
      .collection<Todo>('todos')
      .add(Object.assign({}, todo))
    // if(this.authService.userCredential){
    //  this.listsCollection.doc<List>(listId).collection<Todo>('todos').add({...todo})
    // }
  }

  deleteTodo(todo: Todo, listId: string){
    const list = this.getOne(listId);
    //list.todos.splice(list.todos.indexOf(todo), 1);
  }

  delete(list){
    // this.old_list.splice(this.old_list.indexOf(list), 1);
  }

  private converSnapshotData<T>(actions) {
    return actions.map(a => {
      const id = a.payload.doc.id;
      const data = a.payload.doc.data();
      console.log(data);
      return { id, ...data} as T;
    });
  }
}
