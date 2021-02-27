import { Todo } from './todo';

export class List {
constructor(name : string,uid  : string){
    this.todos = [];
    this.name = name;
    this.owner = uid
}
    name: string;
    todos: Todo[];
    owner : string
    customID : string
}
