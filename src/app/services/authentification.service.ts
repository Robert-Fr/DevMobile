import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import { FirebaseAuthentication } from '@ionic-native/firebase-authentication/ngx';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  userData: any; // Save logged in user data

  constructor(private firebaseAuthentication: FirebaseAuthentication){}


  public login(email: string, psw: string) {
    this.firebaseAuthentication.signInWithEmailAndPassword(email,psw)
  .then((userCredential) => {
    // Signed in
    var user = userCredential.user;
    // ...
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
  });
  }

  public createUser(email: string, psw: string) {
    firebase.auth().createUserWithEmailAndPassword(email, psw)
    .then((userCredential) => {
      // Signed in 
      var user = userCredential.user;
      // ...
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      // ..
    });
  }
}