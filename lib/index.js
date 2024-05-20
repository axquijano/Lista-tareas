//Controlar todo lo del DOM
import {Todo} from '/lib/Todo.js'

window.addEventListener('load', (ev) =>{
    // alert("Cargado");
    let seccion = document.querySelector("#seccion_info");
    const form = document.querySelector('form');
    form.addEventListener('submit', (event)=>{
        event.preventDefault();
        const btn_enviar = document.querySelector('#btn_enviar');
        btn_enviar.disabled = true; 
        const textArea = form.querySelector("textarea");
        let todo = new Todo({title : textArea.value})
        todo.save().then(() => {
            btn_enviar.disabled = false;
            textArea.value = "";
            let  todoCasilla = buildDOMElement(todo);
            seccion.append(todoCasilla);
        })
    })
    Todo.all().then(todos => {
        todos.forEach(todo => {
            let elementTodo = buildDOMElement(todo);
            seccion.append(elementTodo);
        });
    });
    
});

let buildDOMElement = (todo) =>{
    let casilla = document.createElement("div");
    casilla.className = "casilla";
    casilla.setAttribute("name", todo.id);
    casilla.innerHTML =` <input class="info"  type="text" name="${todo.id}" value="${todo.title}">
    <button type="button"class="btn_eliminar" name="${todo.id}" >X</button>`;
    eventoEliminar(casilla,todo);
    eventoEditar(casilla,todo);
    return casilla;
}

let eventoEliminar = (elementTodo, todo) => {
    let btn = elementTodo.querySelector("button");
    btn.addEventListener('click', () => {
        console.log(`Se hizo clic en el botón ${todo.id}`);
        todo.destroy();
        elementTodo.remove();
    })
}

let eventoEditar = (elementTodo, todo ) => {
    let input = elementTodo.querySelector("input")
    input.addEventListener('change', (event) =>{
        todo.title = event.target.value;
        todo.save().then (r =>console.log(r));
    })
}


// fetch('https://jsonplaceholder.typicode.com/posts')
//   .then((response) => response.json())
//   .then(
//     (json) => {
//         let cont = 1;
//         console.log(json);
//         let seccion = document.querySelector("#seccion_info");
//         for( let post of json){
//             let casilla = document.createElement("div");
//             casilla.className = "casilla";
//             casilla.setAttribute("name", post.id);
//             casilla.innerHTML =` <input class="info"  type="text" name="${post.id}" value="${cont} ${post.title}">
//             <button type="button"class="btn_eliminar" name="${post.id}" >X</button>`;
//             cont++;
//             seccion.appendChild(casilla);
//             //para eliminar
//             const btn = document.querySelector(".btn_eliminar[name='"+post.id+"']");
//             btn.addEventListener('click', () => {
//                 console.log(`Se hizo clic en el botón ${btn.name}`);
//                 fetch('https://jsonplaceholder.typicode.com/posts/'+btn.name, {
//                 method: 'DELETE',
//                 }).then(() =>{
//                     const casilla_eliminar = document.querySelector(".casilla[name='"+btn.name+"']");  
//                     casilla_eliminar.remove();
//                 }
                    
//                 );
//             });
//             //para modificar
//             const input = document.querySelector(".info[name='"+post.id+"']");
//             input.addEventListener('change', (event) =>{
//                 console.log(event.target.value);
//                 fetch('https://jsonplaceholder.typicode.com/posts/'+input.name, {
//                     method: 'PUT',
//                     body: JSON.stringify({
//                         title: input.value
//                     }),
//                     headers: {
//                         'Content-type': 'application/json; charset=UTF-8',
//                     },
//                     })
//                     .then((response) => response.json())
//                     .then((json) => console.log(json));
//             })
//         }
//     });

// const form = document.querySelector('form');
// form.addEventListener('submit', (event)=>{
//     event.preventDefault();
//     const btn_enviar = document.querySelector('#btn_enviar');
//     btn_enviar.disabled = true; 
//     fetch('https://jsonplaceholder.typicode.com/posts', {
//         method: 'POST',
//         body: JSON.stringify({
//             title: 'foo',
//             body: 'bar',
//             userId: 1,
//         }),
//         headers: {
//             'Content-type': 'application/json; charset=UTF-8',
//         },
//     })
//     .then((response) => response.json())
//     .then((json) => {
//         console.log(json);
//         btn_enviar.disabled = false;
//     });
// })