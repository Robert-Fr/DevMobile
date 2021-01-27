import { Todo } from "./todo"

export class List {
    name : String;
    todos : Todo[];
    id : string;
    constructor(name: string) {
        this.name = name;
        this.todos=[];
        this.id='_'+Math.random().toString(36).substr(2,9);
      }

}
