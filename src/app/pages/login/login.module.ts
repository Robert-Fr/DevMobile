import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { LoginPageRoutingModule } from './login-routing.module';

import { LoginPage } from './login.page';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { PromiseMessageDisplayerModule } from 'src/app/shared/components/promise-message-displayer/promise-message-displayer.module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    LoginPageRoutingModule,
    ReactiveFormsModule,
    PromiseMessageDisplayerModule
  ],
  declarations: [LoginPage]
})
export class LoginPageModule {}
