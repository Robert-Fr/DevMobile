import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PasswordRecoveryPageRoutingModule } from './password-recovery-routing.module';

import { PasswordRecoveryPage } from './password-recovery.page';
import { PromiseMessageDisplayerComponent } from 'src/app/shared/components/promise-message-displayer/promise-message-displayer.component';
import { PromiseMessageDisplayerModule } from 'src/app/shared/components/promise-message-displayer/promise-message-displayer.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PasswordRecoveryPageRoutingModule,
    TranslateModule,
    ReactiveFormsModule,
    PromiseMessageDisplayerModule
  ],
  declarations: [PasswordRecoveryPage]
})
export class PasswordRecoveryPageModule {}
