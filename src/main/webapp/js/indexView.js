
class indexView{

    constructor(toDo){
        this.toDo = toDo;
        this.onDeleteFinish = null;
        this.onDeleteAndUpdate = null;
    }

    createToDoing = () =>{

        let obj = {
            id:0,
            description: this.toDo.description,
            dateTask: this.toDo.dateTask
        };
        console.log(JSON.stringify(obj));
    
        let xhr = new XMLHttpRequest();
    
        xhr.addEventListener('readystatechange', () =>{
    
            if(xhr.readyState === 4){
                console.log(xhr.responseText);
            }
    
        });
    
        xhr.open('POST',' http://localhost:8080/parcialApiRestSeguro/api/toDoing/create ');
        xhr.setRequestHeader('Content-Type','application/json');
        xhr.send(JSON.stringify(obj));

    };

    deleteToDo = () =>{
        let xhr = new XMLHttpRequest();

        xhr.addEventListener('readystatechange', () =>{
  
          if(xhr.readyState === 4){
            console.log(xhr.response);
            var response = JSON.parse(xhr.responseText);
            if(response.message === 'Operacion exitosa'){
              if(this.onDeleteFinish !== null){
                this.onDeleteFinish();
              } 
            }else{
              alert('no se pudo eliminar al profesor');
            }
             
          }
  
  
        });
  
        xhr.open('DELETE','http://localhost:8080/parcialApiRestSeguro/api/toDo/delete/'+ this.toDo.id);
        xhr.send();

    }

    deleteAndUpdate = () =>{

        let xhr = new XMLHttpRequest();

        xhr.addEventListener('readystatechange', () =>{
  
          if(xhr.readyState === 4){
            console.log(xhr.response);
            var response = JSON.parse(xhr.responseText);
            if(response.message === 'Operacion exitosa'){
              if(this.onDeleteAndUpdate !== null){
                this.createToDoing();
                this.onDeleteAndUpdate();
              } 
            }else{
              alert('no se pudo eliminar al profesor');
            }
             
          }
  
  
        });
  
        xhr.open('DELETE','http://localhost:8080/parcialApiRestSeguro/api/toDo/delete/'+ this.toDo.id);
        xhr.send();

    }

    render = () =>{
        let downContainer = document.createElement('div');
        downContainer.className = 'downCon';
        let headerContainer = document.createElement('div');
        headerContainer.className = 'header';
        let component = document.createElement('div'); //<div> </div>
        component.id = 'toDo' + this.toDo.id;
        component.className = 'toDoComponent'; //<div class = 'profesorComponent'> </div>
        let description = document.createElement('p');//<p></p>
        description.className = 'descriptionName';
        let dateTask = document.createElement('small'); //<small></small>
        let delBtn = document.createElement('button');
        let updateBtn = document.createElement('button');
  
        updateBtn.innerHTML = 'O';
        updateBtn.className = 'upBtn';
        delBtn.innerHTML = 'X';
        delBtn.className = 'delBtn';
  
        description.innerHTML = this.toDo.description; //<p> Andres Andrade</p> Va dentro de la etiqueta
        description.className = 'TitleColor';
        dateTask.innerHTML = this.toDo.dateTask;//<small>Ingenieria</small>
  
        headerContainer.appendChild(dateTask);
        headerContainer.appendChild(delBtn);
        downContainer.appendChild(updateBtn);
        component.appendChild(headerContainer);
        component.appendChild(downContainer);
        component.appendChild(description);
        component.appendChild(updateBtn);
     
  
        delBtn.addEventListener('click', this.deleteToDo);
        updateBtn.addEventListener('click', this.deleteAndUpdate);
  
        return component;
      }

}