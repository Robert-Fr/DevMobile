import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-promise-message-displayer',
  templateUrl: './promise-message-displayer.component.html',
  styleUrls: ['./promise-message-displayer.component.scss'],
})
export class PromiseMessageDisplayerComponent implements OnInit {
  @Input() isDisplay : boolean
  @Input() isError : boolean
  @Input() message : String 
  constructor() { }

  ngOnInit() {

  }

}
