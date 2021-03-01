export class Todo {
    constructor(name, description){
        this.name = name;
        this.description = description;
        this.isDone = false;
    }
    
    name: string;
    description: string;
    isDone: boolean;
}
