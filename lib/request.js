//Peticiones AJAX
/**
 * action {
 *  type: post, update, delete, get
 *  payload:
 * }
 */

const path = "todos";
const endpoint = "https://jsonplaceholder.typicode.com";
export default (action) => {
    let options = {
        method: getMethod(action),
    }
    
    if(action.type=="update" || action.type=="create"){
        let optionsUpdate = {
            method: getMethod(action),
            body : JSON.stringify({
                id: action.payload.id,
                title: action.payload.title
            })
        } 
        return fetch(endpoint + getPath(action), optionsUpdate).then(response => response.json());
    }

    return fetch(endpoint + getPath(action), options).then(response => response.json());
   
}

let getMethod = (action) => {
    switch(action.type){
        case "create":
            return "POST"             
        case "update":
            return "PUT"
        case "destroy":
            return "DELETE"
        case "list":
            return "GET"
        case "listAll":
            return "GET"
    }
}

let getPath = (action) => {
    switch(action.type){
        case "create":
            return `/${path}`             
        case "update":
            return `/${path}/${action.payload.id}`
        case "destroy":
            return `/${path}/${action.payload.id}`
        case "list":
            return `/${path}/${action.payload.id}`
        case "listAll":
            return `/${path}${action.limite?"?_limit="+action.limite+"":""}`
    }
}