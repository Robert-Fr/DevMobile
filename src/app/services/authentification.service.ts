import { Injectable } from '@angular/core';
import 'firebase/auth';
import { Router } from '@angular/router';
import { redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { BehaviorSubject } from 'rxjs';
import '@codetrix-studio/capacitor-google-auth';
import { Plugins } from '@capacitor/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';



export const redirectUnauthorizedToLogin =  () =>redirectUnauthorizedTo(['login'])  //pipe(redirectUnauthorizedTo(['login']), map(lol => emailVerified))
export const redirectAuthorizedToHome = () => redirectLoggedInTo(['home'])

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  public user : BehaviorSubject<firebase.default.User>; // Save logged in user data

  constructor(private router : Router,
    private afAuth : AngularFireAuth ){
      this.user = new BehaviorSubject(null)
      this.afAuth.onAuthStateChanged(user => {
        this.router.navigateByUrl('home')
        this.user.next(user)
      })
    }


  public async googleSignup() {
    const googleUser = await Plugins.GoogleAuth.signIn();
    const credential = firebase.default.auth.GoogleAuthProvider.credential(googleUser.authentication.idToken);
    this.afAuth.signInAndRetrieveDataWithCredential(credential);
  }
  
  public async login(email: string, psw: string){
    return await this.afAuth.signInWithEmailAndPassword(email,psw)
  }

  async signInAndRetrieveDataWithCredential (credential :firebase.default.auth.AuthCredential){
    return await this.afAuth.signInAndRetrieveDataWithCredential(credential)
  }

  public async createUser(email: string, psw: string){
    //Je renvoie la promise pour pouvoir l'utiliser dans la page "register"
    const userCred = await this.afAuth.createUserWithEmailAndPassword(email, psw)
    //Avant de connecter l'utilisateur on lui envoie le mail de verification et on attend qu'il ait validé son mail
    await userCred.user.sendEmailVerification()
    return userCred
  }

  public signOut (){
    this.afAuth.signOut().then(() => {
      console.log("Signed out !")
      this.router.navigate(['login'])
    })
  }

  public async recoverPassword (email : string) : Promise <void>{
    //Je renvoie la promise pour pouvoir l'utiliser dans la page "password-recovery"
    return await this.afAuth.sendPasswordResetEmail(email)
  }
}