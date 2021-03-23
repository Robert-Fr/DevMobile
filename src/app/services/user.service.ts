import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, pluck, tap } from 'rxjs/operators';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public users: Observable<User[]>
  private usersCollection: AngularFirestoreCollection<User>
  constructor(private afs :AngularFirestore) {
    this.usersCollection=afs.collection<User>('Users')
    this.users= this.usersCollection.valueChanges({ idField: 'id' }) 
  }

  deleteUser(user : User){
    this.usersCollection
    .doc(user.id)
    .delete()
  }

  async addUser(user : User){
    const querySnap = await this.afs.collection<User>('Users', ref => ref.where('email', '==', user.email)).ref.get()
    if(querySnap.size ==0)
      this.usersCollection.add({...user})
  }

  getUserMail(email : String) {
    const obs = this.afs.collection<User>('Users', ref => ref.where('email', '==', email)).valueChanges({ idField: 'id' })
    return obs
  }

  getAll(){
    return this.users;
  }

  cleanWhenDisconnect(){
    this.usersCollection=null;
    this.users=null;
  }

}
