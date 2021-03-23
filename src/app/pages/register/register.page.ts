import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuController, ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { User } from 'src/app/models/user';
import { AuthentificationService } from 'src/app/services/authentification.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  private registerForm: FormGroup

  constructor(private fb: FormBuilder,
    private authService: AuthentificationService,
    private router: Router,
    private menu: MenuController,
    public translate: TranslateService,
    private toastController: ToastController,
    private userService : UserService) { }

  ngOnInit() {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
  }

  ionViewDidEnter() {
    this.menu.enable(false);
  }

  ionViewDidLeave() {
    this.menu.enable(true);
  }

  async register() {
    try {
      const userCred = await this.authService.createUser(this.registerForm.get('email').value, this.registerForm.get('password').value)
      //this.authService.userCredential=userCred
      const toast = await this.toastController.create({
        color: 'success',
        duration: 5000,
        message: this.translate.instant('register.toastVerify', { email: this.authService.user.value.email })
      });
      await toast.present();
      //Si le compte a été crée avec succès on enregistre le UID dans firestore dans la collection "Users"
      const newUser = new User(userCred.user.uid,userCred.user.email,userCred.user.displayName,userCred.user.photoURL,userCred.user.emailVerified)
      this.userService.addUser(newUser)
      this.router.navigate(['login']);
    } catch (e) {
      const toast = await this.toastController.create({
        color: 'light',
        duration: 2000,
        message: e.message
      });
      await toast.present();
    }
  }

  get errorControl() {
    return this.registerForm.controls;
  }
}
