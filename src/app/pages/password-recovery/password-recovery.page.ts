import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuController, ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { AuthentificationService } from 'src/app/services/authentification.service';

@Component({
  selector: 'app-password-recovery',
  templateUrl: './password-recovery.page.html',
  styleUrls: ['./password-recovery.page.scss'],
})
export class PasswordRecoveryPage implements OnInit {

  private recoveryForm : FormGroup

  constructor(private fb : FormBuilder,
    private authService : AuthentificationService,
    private router : Router,
    private menu: MenuController,
    public translate: TranslateService,
    private toastController : ToastController) { }

  ngOnInit() {
    this.recoveryForm = this.fb.group({
      email :['',[Validators.required]]
    })
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
        message : this.translate.instant('passwordRecovery.toastEmailSend', { email: this.recoveryForm.get('email').value }),
      })
      await toast.present()
      this.router.navigate(['login'])
    }
    catch(error) {
      const errorMessage = error.message;
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
