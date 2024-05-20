//Consultar via objetos y metodos
import performer from '/lib/request.js';

export class Todo {
    static async all(){
        let todos = await performer({
            type: "listAll", 
            limite : 3
        });
       return todos.map( todosJson => new Todo(todosJson));
    
    }

    save = async() =>{
        //No cambie el contexto
        if(this.id) return this.update();
        this.create();
    }

    create = async()=>{
        let response = await performer({
            type: "create",
            payload : {
                title: this.title,
            }
        }).then(data => this.id = data.id);
        return response;
    }

    update = async() =>{
        let response = await performer({
            type: "update",
            payload : {
                id: this.id,
                title: this.title,
            }
        });
        return response;
    }

    async destroy(){
        let  eliminarTodo = await performer({
            type: "destroy",
            payload : {
                id: this.id
            }
        });
        console.log(eliminarTodo);
    }

    constructor(args){
        this.userId = args.userId;
        this.title = args.title;
        this.completed = args.completed;
        this.id = args.id;
    }
}
