import { Todo } from './todo';
export class List {
    constructor(name : string,uid  : string) {
        this.name = name
        this.owner = uid
        this.readers = []
        this.writers = []
        var todayd =new Date()
        var dd = String(todayd.getDate()).padStart(2, '0');
        var mm = String(todayd.getMonth() + 1).padStart(2, '0');
        var yyyy = todayd.getFullYear();
        var today = mm + '/' + dd + '/' + yyyy;
        this.creationDate = today
    }
    
    name: string
    todos: Todo[]
    owner : string
    id : string
    readers: string[]
    writers : string[]
    creationDate : string
}
