import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AuthentificationService } from 'src/app/services/authentification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  private loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, 
    private modalController: ModalController,
    private authentificationService : AuthentificationService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      login: ['', [Validators.required]],
      password: ['', [Validators.required]],
    })
  }

  login(): void {
    this.authentificationService.login(this.loginForm.get('login').value, this.loginForm.get('password').value);
  }

  get errorControl() {
    return this.loginForm.controls;
  }

}
