import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { AuthentificationService } from 'src/app/services/authentification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public isError: boolean
  public isDisplay: boolean
  public message: String
  private loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private authentificationService: AuthentificationService,
    private router: Router,
    private toastController: ToastController) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      login: ['', [Validators.required]],
      password: ['', [Validators.required]],
    })
    this.isError = false
    this.isDisplay = false
    this.message = ''
  }

  async login(): Promise<void> {
    try {
      const userCred = await this.authentificationService.login(this.loginForm.get('login').value, this.loginForm.get('password').value);
      this.authentificationService.userCredential = userCred
      if (userCred.user.emailVerified) {
        const toast = await this.toastController.create({
          color: "success",
          duration: 5000,
          message: "Login successful",
        })
        await toast.present();
        this.isError = false
        this.isDisplay = true
        this.message = 'Login successful'
        this.router.navigate(['home']);
      }
      else {
        const toast = await this.toastController.create({
          color: "light",
          duration: 5000,
          message: "This email isn\'t verified... check your mail box",
        })
        await toast.present();
        this.isError = true
        this.isDisplay = true
        this.message = 'This email isn\'t verified... check your mail box'
      }
    }
    catch (error) {
      var errorMessage = error.message;
      this.isError = true
      this.isDisplay = true
      this.message = String(errorMessage)
      const toast = await this.toastController.create({
        color: "light",
        duration: 5000,
        message: errorMessage,
      })
      await toast.present();
    };
  }

  get errorControl() {
    return this.loginForm.controls;
  }

}
