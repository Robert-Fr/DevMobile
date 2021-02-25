import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import { FirebaseAuthentication } from '@ionic-native/firebase-authentication/ngx';
import 'firebase/auth';
import { Router } from '@angular/router';
import { emailVerified, redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/auth-guard';



export const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']) 
export const redirectAuthorizedToHome = () => redirectLoggedInTo(['home'])

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  public userCredential: firebase.auth.UserCredential; // Save logged in user data

  constructor(private router : Router ){}


  public async login(email: string, psw: string){
    const userCred  = await firebase.auth().signInWithEmailAndPassword(email,psw)
    return userCred
  }

  public async createUser(email: string, psw: string){
    //Je renvoie la promise pour pouvoir l'utiliser dans la page "register"
    const userCred = await firebase.auth().createUserWithEmailAndPassword(email, psw)
    //Avant de connecter l'utilisateur on lui envoie le mail de verification et on attend qu'il ait validé son mail
    await userCred.user.sendEmailVerification()
    return userCred
  }

  public signOut (){
    firebase.auth().signOut().then(() => {
      console.log("Signed out !")
      this.router.navigate(['login'])
    })
  }

  public async recoverPassword (email : string) : Promise <void>{
    //Je renvoie la promise pour pouvoir l'utiliser dans la page "password-recovery"
    return await firebase.auth().sendPasswordResetEmail(email)
  }
}