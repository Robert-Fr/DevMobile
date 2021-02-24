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

  public isError : boolean
  public isDisplay : boolean
  public message : String
  private loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private authentificationService : AuthentificationService,
    private router : Router) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      login: ['', [Validators.required]],
      password: ['', [Validators.required]],
    })
    this.isError=false
    this.isDisplay=false
    this.message=''
  }

  login(): void {
    var p = this.authentificationService.login(this.loginForm.get('login').value, this.loginForm.get('password').value);
    p.then((userCredential) => {
      // Signed in
    this.isError=false
    this.isDisplay=true
    this.message='Login successful ... Redirecting'
      var user = userCredential.user;
      this.authentificationService.userData=userCredential
      this.router.navigate(['home']);
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      this.isError=true
      this.isDisplay=true
      this.message= String(errorMessage)
    });
  }

  get errorControl() {
    return this.loginForm.controls;
  }

}
