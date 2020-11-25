const description = document.getElementById('description');
const regis = document.getElementById('regis');
const todoContainer = document.getElementById('todoContainer');
const todoingContainer = document.getElementById('todoingContainer');
const todoneContainer = document.getElementById('todoneContainer');

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
            getAllToDoing();
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

                view.onDeleteAndUpdate = () =>{
                    getAllToDoing();
                    todoContainer.removeChild(document.getElementById('toDo'+toDoDTO.id));
                    getAllToDoing();
                };

                todoContainer.appendChild(view.render()); 
            }

        }


    });

    xhr.open('GET','http://localhost:8080/parcialApiRestSeguro/api/toDo/all');
    xhr.send();

    };

    getAllTodo();
    const getAllToDoing = () =>{
        
        todoingContainer.innerHTML = '';
        let xhr = new XMLHttpRequest();

        xhr.addEventListener('readystatechange', () =>{

            if(xhr.readyState === 4){
                let json = xhr.responseText;
                let response = JSON.parse(json);
                console.log(response);
                todoingContainer.innerHTML = '';

                for(let i = 0; i < response.length ;i++){

                    let toDoingDTO  = response[i];
                    let view = new toDoingView(toDoingDTO);

                    view.OnDeleteDoing = () =>{
                        todoingContainer.appendChild(document.getElementById('todoing'+ toDoingDTO.id));
                        getAllToDoing();
                    };

                    view.updateToDo = () =>{
                        todoingContainer.appendChild(document.getElementById('todoing'+ toDoingDTO.id));
                        getAllTodo();
                        getAllToDoing();
                        getAllTodo();
                    };

                    view.updateToDone = () =>{
                        todoingContainer.appendChild(document.getElementById('todoing'+ toDoingDTO.id));
                        getAllToDoing();
                        getAllToDone();
                        getAllToDone();
                    };

                    todoingContainer.appendChild(view.render());
                }

            }


        });
        
        xhr.open('GET','http://localhost:8080/parcialApiRestSeguro/api/toDoing/all');
        xhr.send();
    };
    getAllToDoing();


    const getAllToDone = () =>{

        todoneContainer.innerHTML = '';
        let xhr = new XMLHttpRequest();
        xhr.addEventListener('readystatechange', () =>{

            if(xhr.readyState === 4){
                let json = xhr.responseText;
                let response = JSON.parse(json);
                console.log(response);
                todoneContainer.innerHTML = '';

                for(let i = 0; i < response.length;i++){

                    let toDoneDTO  = response[i];
                    let view = new toDoneView(toDoneDTO);

                    view.deleteDoneTask = () =>{
                        getAllToDone();
                    };

                    view.updateToDoing = () =>{
                        todoneContainer.appendChild(document.getElementById('todone'+ toDoneDTO.id));
                        getAllToDone();
                        getAllToDoing();
                    };

                    todoneContainer.appendChild(view.render());
                }

            }

        });

        xhr.open('GET','http://localhost:8080/parcialApiRestSeguro/api/toDone/all');
        xhr.send();

    };

    getAllToDone();