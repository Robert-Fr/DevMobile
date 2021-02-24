import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import { FirebaseAuthentication } from '@ionic-native/firebase-authentication/ngx';
import 'firebase/auth';
import { Router } from '@angular/router';
import { redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/auth-guard';



export const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
export const redirectAuthorizedToHome = () => redirectLoggedInTo(['home']);
@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  public userData: any; // Save logged in user data

  constructor(private router : Router ){}


  public login(email: string, psw: string) : Promise<firebase.auth.UserCredential> {
    return firebase.auth().signInWithEmailAndPassword(email,psw)
  }

  public createUser(email: string, psw: string) : Promise<firebase.auth.UserCredential> {
    //Je renvoie la promise pour pouvoir l'utiliser dans la page "register"
    return firebase.auth().createUserWithEmailAndPassword(email, psw)
  }

  public signOut () : void{
    firebase.auth().signOut().then(() => {
      console.log("Signed out !")
      this.router.navigate(['login'])
    })
  }

  public recoverPassword (email : string) : Promise <void>{
    //Je renvoie la promise pour pouvoir l'utiliser dans la page "password-recovery"
    return firebase.auth().sendPasswordResetEmail(email)
  }
}