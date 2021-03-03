import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public users: Observable<User[]>;
  private usersCollection: AngularFirestoreCollection<User>;
  constructor(private afs :AngularFirestore) {
    this.usersCollection=afs.collection<User>('Users')
    this.users= this.usersCollection.valueChanges({ idField: 'id' }) 
  }

  deleteUser(user : User){
    this.usersCollection
    .doc(user.id)
    .delete()
  }

  addUser(user : User){
    this.usersCollection.add({...user})
  }

  getAll(){
    return this.users;
  }

}
