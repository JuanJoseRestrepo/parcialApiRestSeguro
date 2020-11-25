const description = document.getElementById('description');
const regis = document.getElementById('regis');
const todoContainer = document.getElementById('todoContainer');

const registrar = () =>{

    let obj = {
        id:0,
        description: description.value
    };
    console.log(JSON.stringify(obj));

    let xhr = new XMLHttpRequest();

    xhr.addEventListener('readystatechange', () =>{

        if(xhr.readyState === 4){
            console.log(xhr.responseText);
            getAllTodo();
        }

    });

    xhr.open('POST',' http://localhost:8080/parcialApiRestSeguro/api/toDo/create ');
    xhr.setRequestHeader('Content-Type','application/json');
    xhr.send(JSON.stringify(obj));
};

regis.addEventListener('click',registrar);

const getAllTodo = () =>{

    todoContainer.innerHTML = '';
    let xhr = new XMLHttpRequest();
    xhr.addEventListener('readystatechange', () =>{

        if(xhr.readyState === 4){
            let json = xhr.responseText;
            let response = JSON.parse(json);
            console.log(response);

            todoContainer.innerHTML = '';
            for(let i = 0; i < response.length ;i++){
                let toDoDTO = response[i];
                let view = new indexView(toDoDTO);
                view.onDeleteFinish = () =>{
                    todoContainer.removeChild(document.getElementById('toDo'+toDoDTO.id));
                };
                todoContainer.appendChild(view.render()); 
            }

        }


    });

    xhr.open('GET','http://localhost:8080/parcialApiRestSeguro/api/toDo/all');
    xhr.send();

    };

    getAllTodo();