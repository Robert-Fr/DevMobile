import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthentificationService } from 'src/app/services/authentification.service';

@Component({
  selector: 'app-password-recovery',
  templateUrl: './password-recovery.page.html',
  styleUrls: ['./password-recovery.page.scss'],
})
export class PasswordRecoveryPage implements OnInit {
  //deux variables pour afficher un message d'erreur s'il y a un problème dans la création de compte
  public recoveryReturned : boolean
  public recoveryMessage : String

  private recoveryForm : FormGroup

  constructor(private fb : FormBuilder,
    private authService : AuthentificationService,
    private router : Router) { }

  ngOnInit() {
    this.recoveryForm = this.fb.group({
      email :['',[Validators.required]]
    })
    this.recoveryReturned =false
    this.recoveryMessage = ''
  }


  recoverPassword() : void {
    var p = this.authService.recoverPassword(this.recoveryForm.get('email').value)
    //J'utilise la pomise ici pour pouvoir récupérer les messages d'erreurs et l'afficher sur la page
    p.then(() => {
      console.log(`Mail sent : check yout mails`)
      this.recoveryReturned = true
      this.recoveryMessage = "Mail sent : check yout mails"
      //this.router.navigate(['login'])
    })
    .catch((error) => {
      console.log(`error code: ${error.code}`)
      console.log(`error message: ${error.message}`)
      this.recoveryReturned=true
      //TODO : afficher dans le form 
      var errorCode = error.code;
      this.recoveryMessage = errorCode+ "  /  " +error.message;
    });
  }

  get errorControl(){
    return this.recoveryForm.controls;
  }
}
