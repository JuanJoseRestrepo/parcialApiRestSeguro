const description = document.getElementById('description');
const regis = document.getElementById('regis');

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
        }

    });

    xhr.open('POST',' http://localhost:8080/parcialApiRestSeguro/api/toDo/create ');
    xhr.setRequestHeader('Content-Type','application/json');
    xhr.send(JSON.stringify(obj));
};

regis.addEventListener('click',registrar);

