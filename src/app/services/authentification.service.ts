import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import { FirebaseAuthentication } from '@ionic-native/firebase-authentication/ngx';
import 'firebase/auth';
import { Router } from '@angular/router';
import { redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/auth-guard';

@Injectable({
  providedIn: 'root'
})

export const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
export const redirectAuthorizedToHome = () => redirectLoggedInTo(['home']);

export class AuthentificationService {

  userData: any; // Save logged in user data

  constructor(private router : Router ){}


  public login(email: string, psw: string) {
    firebase.auth().signInWithEmailAndPassword(email,psw)
  .then((userCredential) => {
    // Signed in
    var user = userCredential.user;
    console.log(`user : ${user}`);
    this.router.navigate(['home']);
    // ...
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log("N00B");
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