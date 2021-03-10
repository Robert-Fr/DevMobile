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
  public lists: Observable<List[]>;
  public listsOwned: Observable<List[]>;
  public listsRead: Observable<List[]>;
  public listsWrite: Observable<List[]>;
  private listsCollection: AngularFirestoreCollection<List>;

  constructor(private afs : AngularFirestore,
    private authService : AuthentificationService) { 
    this.listsCollection = afs.collection<List>('Lists')
    this.lists= this.listsCollection.valueChanges({ idField: 'id' })
    this.listsOwned = this.getListsOwned()
    this.listsRead = this.getListsICanRead()
    this.listsWrite = this.getListsICanWrite()
  }

  getAll(){
    return this.lists;
  }

  getListsOwned() {
    const obs = this.afs.collection<List>('Lists', ref => ref.where('owner', '==', this.authService.userCredential.user.email)).valueChanges({ idField: 'id' })
    return obs
  }

  getListsICanRead() {
    const obs = this.afs.collection<List>('Lists', ref => ref.where('readers',"array-contains" ,this.authService.userCredential.user.email)).valueChanges({ idField: 'id' })
    return obs
  }

  getListsICanWrite(){
    const obs = this.afs.collection<List>('Lists', ref => ref.where('writers',"array-contains" ,this.authService.userCredential.user.email)).valueChanges({ idField: 'id' })
    return obs
  }

  getAllListsOfUser(){
    //TODO
    const obs = this.afs.collection<List>('Lists', ref => ref.where('owner',"==" ,this.authService.userCredential.user.email)).valueChanges()
    return obs
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

  public isReadOnly(list : List) : Observable<boolean>{
    return this.listsRead.pipe(
      map(tab => {
        if (tab.indexOf(list) != -1)
          return false;

        else
          return true;
      })
    );
  }

  public isWritable(list : List) : Observable<boolean> {
    return this.listsWrite.pipe(
      map(tab => {
        if (tab.indexOf(list) != -1)
          return false;
        else
          return true;
      })
    )
  }
  public isOwned(list : List) : Observable<boolean> {
    return this.listsOwned.pipe(
      map(tab => {
        if (tab.indexOf(list) != -1)
          return false;
        else
          return true;
      })
    )
  }
}
