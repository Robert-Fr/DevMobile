import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PromiseMessageDisplayerComponent } from './promise-message-displayer.component';



@NgModule({
  declarations: [PromiseMessageDisplayerComponent],
  imports: [
    CommonModule
  ],
  exports : [
    PromiseMessageDisplayerComponent
  ]
})
export class PromiseMessageDisplayerModule { }
