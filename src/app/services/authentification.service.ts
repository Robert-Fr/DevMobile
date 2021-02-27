import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import { FirebaseAuthentication } from '@ionic-native/firebase-authentication/ngx';
import 'firebase/auth';
import { Router } from '@angular/router';
import { emailVerified, redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/auth-guard';



export const redirectUnauthorizedToLogin = () =>  { 
  redirectUnauthorizedTo(['login']) 
  emailVerified
}
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

  public onSignIn(googleUser){
    gapi.load('auth2', function() {
      gapi.auth2.init({client_id:'206908967476-2do5on1ovdmvtb2lv6lpd65lmacsna60.apps.googleusercontent.com'})
    });
    firebase.auth().onAuthStateChanged((firebaseUser) => {
      //unsubscribe();
      // Check if we are already signed-in Firebase with the correct user.
      if (!this.isUserEqual(googleUser, firebaseUser)) {
        // Build Firebase credential with the Google ID token.
        var credential = firebase.auth.GoogleAuthProvider.credential(
            googleUser.getAuthResponse().id_token);
  
        // Sign in with credential from the Google user.
        firebase.auth().signInWithCredential(credential).catch((error) => {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
          // ...
        });
      } else {
        console.log('User already signed-in Firebase.');
      }
    });
  }

  isUserEqual(googleUser, firebaseUser) {
    if (firebaseUser) {
      var providerData = firebaseUser.providerData;
      for (var i = 0; i < providerData.length; i++) {
        if (providerData[i].providerId === firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
            providerData[i].uid === googleUser.getBasicProfile().getId()) {
          // We don't need to reauth the Firebase connection.
          return true;
        }
      }
    }
    return false;
  }
}