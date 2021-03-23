import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuController, ModalController, ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { AuthentificationService } from 'src/app/services/authentification.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  private loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private authentificationService: AuthentificationService,
    private router: Router,
    public translateService: TranslateService,
    private menu: MenuController,
    private toastController: ToastController) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      login: ['', [Validators.required]],
      password: ['', [Validators.required]],
    })
  }

  ionViewDidEnter() {
    this.menu.enable(false);
  }

  ionViewDidLeave() {
    this.menu.enable(true);
  }
  
  async login(): Promise<void> {
    try {
      const userCred = await this.authentificationService.login(this.loginForm.get('login').value, this.loginForm.get('password').value);
      if (userCred.user.emailVerified) {
        const toast = await this.toastController.create({
          color: "success",
          duration: 5000,
          message: this.translateService.instant('login.toastLoginSucess'),
        })
        await toast.present();
        this.router.navigate(['home']);
      }
      else {
        const toast = await this.toastController.create({
          color: "light",
          duration: 5000,
          message: await this.translateService.instant('login.toastLoginNotVerified')
        })
        await toast.present();
      }
    }
    catch (error) {
      const errorMessage = error.message;
      const toast = await this.toastController.create({
        color: "danger",
        duration: 5000,
        message: errorMessage,
      })
      await toast.present();
    };
  }

  public onEnglish() {
    this.translateService.use('en');
  }
  
  public onFrench() {
    this.translateService.use('fr');
  }

  async googleSignup() {
    await this.authentificationService.googleSignup();
  }

  get errorControl() {
    return this.loginForm.controls;
  }

}
