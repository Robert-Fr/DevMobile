import { Injectable } from '@angular/core';
import { List } from '../models/list';
import { Todo } from '../models/todo';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable, Subject } from 'rxjs';
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
    this.lists= this.listsCollection.valueChanges({ idField: 'id' })
  }

  getAll(){
    return this.lists;
  }

  getListsOwned() {
    //faire une query qui renvoie un obeservable sur des list tq c'est les list ou : list.owner = authentificationService.userCredential.user.uid
    const owned = new Subject<string>();
    const queryObservable = owned.pipe(
      switchMap( owner => 
      this.afs.collection('Lists', ref => ref.where('owner', '==', owner)).valueChanges()
      )
    )
    owned.next(this.authService.userCredential.user.uid)
    //trigger query
    // return queryObservable
  }

  getListsICanRead() {
    //faire une query qui renvoie un obeservable sur des list tq c'est les list ou : authentificationService.userCredential.user.uid appartient a list.readers
  }

  getListsICanWrite(){
//faire une query qui renvoie un obeservable sur des list tq c'est les list ou : authentificationService.userCredential.user.uid appartient a list.writers
  }

  getAllListsOfUser(){
//faire une query qui renvoie un obeservable sur des list tq : c'est l'union des trois du dessus
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
    this.listsCollection.add({...list})
  }


  delete(list : List){
    this.listsCollection
    .doc(list.id)
    .delete()
  }

  addTodo(todo: Todo, listId: string){
    this.listsCollection
    .doc(listId)
    .collection<Todo>('todos')
    .add(Object.assign({}, todo))
  }

  deleteTodo(todo: Todo, listId: string){
    const list = this.getOne(listId);
    
    this.listsCollection
      .doc(listId)
      .collection<Todo>('todos')
      .doc(todo.id)
      .delete()
  }


  private converSnapshotData<T>(actions) {
    return actions.map(a => {
      const id = a.payload.doc.id;
      const data = a.payload.doc.data();
      return { id, ...data} as T;
    });
  }
}
