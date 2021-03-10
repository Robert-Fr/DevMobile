import { Todo } from './todo';
export class List {
    constructor(name : string,uid  : string) {
        this.name = name
        this.owner = uid
        this.readers = []
        this.writers = []
    }
    
    name: string
    todos: Todo[]
    owner : string
    id : string
    readers: string[]
    writers : string[]
}
