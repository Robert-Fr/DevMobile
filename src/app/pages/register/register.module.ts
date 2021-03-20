import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisterPageRoutingModule } from './register-routing.module';

import { RegisterPage } from './register.page';
import { PromiseMessageDisplayerModule } from 'src/app/shared/components/promise-message-displayer/promise-message-displayer.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegisterPageRoutingModule,
    TranslateModule,
    ReactiveFormsModule,
    PromiseMessageDisplayerModule
  ],
  declarations: [RegisterPage]
})
export class RegisterPageModule {}
