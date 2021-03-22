import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuController, ToastController } from '@ionic/angular';
import { AuthentificationService } from 'src/app/services/authentification.service';

@Component({
  selector: 'app-password-recovery',
  templateUrl: './password-recovery.page.html',
  styleUrls: ['./password-recovery.page.scss'],
})
export class PasswordRecoveryPage implements OnInit {
  //deux variables pour afficher un message d'erreur s'il y a un problème dans la création de compte
  public isDisplay : boolean
  public isError : boolean
  public message : String

  private recoveryForm : FormGroup

  constructor(private fb : FormBuilder,
    private authService : AuthentificationService,
    private router : Router,
    private menu: MenuController,
    private toastController : ToastController) { }

  ngOnInit() {
    this.recoveryForm = this.fb.group({
      email :['',[Validators.required]]
    })
    this.isError=false
    this.isDisplay =false
    this.message = ''
  }

  ionViewWillEnter() {
    this.menu.enable(false);
  }

  ionViewDidLeave() {
    // enable the root left menu when leaving the tutorial page
    this.menu.enable(true);
  }


  async recoverPassword() {
    try{
      await this.authService.recoverPassword(this.recoveryForm.get('email').value)
      const toast = await this.toastController.create({
        color :"success",
        duration :5000,
        message : `A mail as been sent to ${this.recoveryForm.get('email').value} to recover the password`,
      })
      await toast.present()
      this.isDisplay = true
      this.message = `A mail as been sent to ${this.recoveryForm.get('email').value} to recover the password`
      this.isError=false
      this.router.navigate(['login'])
    }
    catch(error) {
      this.isDisplay=true
      var errorMessage = error.message;
      this.message =String(errorMessage);
      this.isError=true
      const toast = await this.toastController.create({
        color :"success",
        duration :5000,
        message : errorMessage,
      })
      await toast.present()
    }
  }

  get errorControl(){
    return this.recoveryForm.controls;
  }
}
