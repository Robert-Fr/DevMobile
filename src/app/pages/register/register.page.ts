import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthentificationService } from 'src/app/services/authentification.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  //deux variables pour afficher un message d'erreur s'il y a un problème dans la création de compte
  public message: String
  public isDisplay: boolean
  public isError: boolean

  private registerForm: FormGroup

  constructor(private fb: FormBuilder,
    private authService: AuthentificationService,
    private router: Router,
    private toastController: ToastController) { }

  ngOnInit() {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
    this.isDisplay = false
    this.message = ''
    this.isError = false
  }

  async register() {
    try {
      const userCred = await this.authService.createUser(this.registerForm.get('email').value, this.registerForm.get('password').value)
      this.authService.userCredential=userCred
      //J'utilise la pomise ici pour pouvoir récupérer les messages d'erreurs et l'afficher sur la page
      this.isDisplay = true
      this.isError = false
      this.message = "You registered successfully ! Check your mail box to verify your mail adress"

      const toast = await this.toastController.create({
        color: 'success',
        duration: 5000,
        message: `You registered successfully ! An email confirmation as been sent to ${this.authService.userCredential.user.email}`
      });
      await toast.present();
      this.router.navigate(['login']);
    } catch (e) {
      const toast = await this.toastController.create({
        color: 'light',
        duration: 2000,
        message: e.message
      });
      await toast.present();
      this.isDisplay = true
      this.isError = true
      this.message = e.message
    }
  }

  get errorControl() {
    return this.registerForm.controls;
  }
}
