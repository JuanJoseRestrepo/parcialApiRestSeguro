

class toDoneView{


    constructor(toDone){
        this.toDone = toDone;
        this.deleteDoneTask = null;
        this.updateToDoing = null;
    }


    createToDoingTask = () =>{

        let obj = {
            id:0,
            description: this.toDone.description,
            dateTask: this.toDone.dateTask
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


    deleteAndUpdateToDone = () =>{


        let xhr = new XMLHttpRequest();

        xhr.addEventListener('readystatechange', () =>{
  
          if(xhr.readyState === 4){
            console.log(xhr.response);
            var response = JSON.parse(xhr.responseText);
            if(response.message === 'Operacion exitosa'){
              
              if(this.updateToDoing !== null){
                this.createToDoingTask();
                this.updateToDoing();
              } 
            }else{
              alert('no se pudo eliminar al profesor');
            }
             
          }
  
  
        });
  
        xhr.open('DELETE','http://localhost:8080/parcialApiRestSeguro/api/toDone/delete/'+ this.toDone.id);
        xhr.send();


    };


    deleteToDone = () =>{

        let xhr = new XMLHttpRequest();

        xhr.addEventListener('readystatechange', () =>{
  
          if(xhr.readyState === 4){
            console.log(xhr.response);
            var response = JSON.parse(xhr.responseText);
            if(response.message === 'Operacion exitosa'){
              if(this.deleteDoneTask !== null){
                this.deleteDoneTask();
              } 
            }else{
              alert('no se pudo eliminar al profesor');
            }
             
          }
  
  
        });
  
        xhr.open('DELETE','http://localhost:8080/parcialApiRestSeguro/api/toDone/delete/'+ this.toDone.id);
        xhr.send();

    };


    render = () =>{
        let downContainer = document.createElement('div');
        downContainer.className = 'downCon';
        let headerContainer = document.createElement('div');
        headerContainer.className = 'header';
        let component = document.createElement('div'); //<div> </div>
        component.id = 'todone' + this.toDone.id;
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
  
        description.innerHTML = this.toDone.description; //<p> Andres Andrade</p> Va dentro de la etiqueta
        description.className = 'TitleColor';
        dateTask.innerHTML = this.toDone.dateTask;//<small>Ingenieria</small>
  
        headerContainer.appendChild(dateTask);
        headerContainer.appendChild(delBtn);
        downContainer.appendChild(updateBtn);
        component.appendChild(headerContainer);
        component.appendChild(downContainer);
        component.appendChild(description);
        component.appendChild(updateBtn);
     
        
        delBtn.addEventListener('click', this.deleteToDone);
        updateBtn.addEventListener('click', this.deleteAndUpdateToDone); 
        
        
  
        return component;
      }

}