import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthentificationService } from 'src/app/services/authentification.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  //deux variables pour afficher un message d'erreur s'il y a un problème dans la création de compte
  public registerErrorReturned : boolean
  public registerErrorMessage : String

  private registerForm : FormGroup

  constructor(private fb : FormBuilder,
    private authService : AuthentificationService,
    private router : Router) { }

  ngOnInit() {
    this.registerForm = this.fb.group({
      email :['',[Validators.required]],
      password:['',[Validators.required]]
    })
    this.registerErrorReturned =false
    this.registerErrorMessage = ''
  }

  register() : void{
    var p = this.authService.createUser(this.registerForm.get('email').value,this.registerForm.get('password').value)
    //J'utilise la pomise ici pour pouvoir récupérer les messages d'erreurs et l'afficher sur la page
    p.then((userCredential) => {
      // Signed in 
      console.log(`REGISTER`)
      this.registerErrorReturned = false
      var user = userCredential.user
      this.authService.userData=userCredential
      console.log(`user created : ${user}`)
      this.router.navigate(['home'])
    })
    .catch((error) => {
      console.log(`error code: ${error.code}`)
      console.log(`error message: ${error.message}`)
      this.registerErrorReturned=true
      //TODO : afficher dans le form 
      var errorCode = error.code;
      this.registerErrorMessage = errorCode+ "  /  " +error.message;
    });
  }

  get errorControl(){
    return this.registerForm.controls;
  }
}
