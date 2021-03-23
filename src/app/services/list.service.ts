import { Injectable } from '@angular/core';
import { List } from '../models/list';
import { Todo } from '../models/todo';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable, Subject } from 'rxjs';
import { Test } from '../models/test';
import { AuthentificationService } from './authentification.service';
import { find, map, switchMap, tap } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class ListService {
  public listsOwned: Observable<List[]>;
  public listsRead: Observable<List[]>;
  public listsWrite: Observable<List[]>;
  private listsCollection: AngularFirestoreCollection<List>;

  constructor(private afs: AngularFirestore,
    private authService: AuthentificationService,
    private afAuth: AngularFireAuth) {
    this.listsCollection = afs.collection<List>('Lists')
    this.getAll()
    this.afAuth.onAuthStateChanged(user => {
      this.getAll();
    })
  }

  getAll() {
    if(this.authService.user && this.authService.user.value) {
      this.listsOwned = this.getListsOwned()
      this.listsRead = this.getListsICanRead()
      this.listsWrite = this.getListsICanWrite()
    }
    else{

      this.listsOwned = this.getListsOwned()
      this.listsRead = this.getListsICanRead()
      this.listsWrite = this.getListsICanWrite()
    }
  }

  getListsOwned() {
    const obs = this.afs.collection<List>('Lists', ref => ref.where('owner', '==', this.authService.user.value.email)).valueChanges({ idField: 'id' })
    return obs
  }

  getListsICanRead() {
    const obs = this.afs.collection<List>('Lists', ref => ref.where('readers', "array-contains", this.authService.user.value.email)).valueChanges({ idField: 'id' })
    return obs
  }

  getListsICanWrite() {
    const obs = this.afs.collection<List>('Lists', ref => ref.where('writers', "array-contains", this.authService.user.value.email)).valueChanges({ idField: 'id' })
    return obs
  }

  getAllListsOfUser() {
    //TODO
    const obs = this.afs.collection<List>('Lists', ref => ref.where('owner', "==", this.authService.user.value.email)).valueChanges()
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

  create(list: List) {
    this.listsCollection.add({ ...list })
  }


  async delete(list: List) {
    //on supprime tous les todos de la nested collection:
    // on récupère un observable sur une querysnapshot de document (les todos de la liste que l'on veut supprimer)
    const querySnapshotTodosDocs = this.listsCollection.doc(list.id).collection("todos").ref.get();
    //Une fois qu'on a une snapshot sur les documents
    querySnapshotTodosDocs.then(
      async querySnapshot => {
        //on supprime chacun des documents en prenant sa reference
        const promiseDocDeleted = querySnapshot.docs.map(
          doc => doc.ref.delete()
        )
        //on attend que toutes les suppressions soient finies
        await Promise.all(promiseDocDeleted)
      }
    )
    //on peut maintenant supprimer la liste
    this.listsCollection.doc(list.id).delete()
  }

  addTodo(todo: Todo, listId: string) {
    this.listsCollection
      .doc(listId)
      .collection<Todo>('todos')
      .add(Object.assign({}, todo))
  }

  deleteTodo(todo: Todo, listId: string) {
    const list = this.getOne(listId);
    this.listsCollection
      .doc(listId)
      .collection<Todo>('todos')
      .doc(todo.id)
      .delete()
  }
  
  updateTodo(todo: Todo, listId: string) {
    const list = this.getOne(listId);
    this.listsCollection
      .doc(listId)
      .collection<Todo>('todos')
      .doc(todo.id)
      .update(Object.assign({}, todo))
  }
  private converSnapshotData<T>(actions) {
    return actions.map(a => {
      const id = a.payload.doc.id;
      const data = a.payload.doc.data();
      return { id, ...data } as T;
    });
  }

  public isReadOnly(listId: string): Observable<boolean> {
    return this.listsRead.pipe(
      map(tab => {
        if (tab.find(list => list.id === listId))
          return true
        return false
      })
    );
  }

  public isWritable(listId: string): Observable<boolean> {
    return this.listsWrite.pipe(
      map(tab => {
        if (tab.find(list => list.id === listId))
          return true
        return false
      })
    );
  }
  public isOwned(listId: string): Observable<boolean> {
    return this.listsOwned.pipe(
      map(tab => {
        if (tab.find(list => list.id === listId))
          return true
        return false
      })
    );
  }
}
