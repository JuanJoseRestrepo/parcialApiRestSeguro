
class toDoingView{

    constructor(toDoing){
        this.toDoing = toDoing;
        this.OnDeleteDoing = null;
        this.updateToDo = null;
        this.updateToDone = null;
    }


    createToDone = () => {

        let obj = {
            id:0,
            description: this.toDoing.description,
            dateTask: this.toDoing.dateTask
        };
        console.log(JSON.stringify(obj));
    
        let xhr = new XMLHttpRequest();
    
        xhr.addEventListener('readystatechange', () =>{
    
            if(xhr.readyState === 4){
                console.log(xhr.responseText);
            }
    
        });
    
        xhr.open('POST',' http://localhost:8080/parcialApiRestSeguro/api/toDone/create ');
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
              if(this.updateToDo !== null){
                this.updateToDone();
                this.createToDone();
              } 
            }else{
              alert('no se pudo eliminar al profesor');
            }
             
          }
  
  
        });
  
        xhr.open('DELETE','http://localhost:8080/parcialApiRestSeguro/api/toDoing/delete/'+ this.toDoing.id);
        xhr.send();


    };

    createToDo = () =>{

        let obj = {
            id:0,
            description: this.toDoing.description,
            dateTask: this.toDoing.dateTask
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

    deleteAndUpdateToDo = () =>{

        let xhr = new XMLHttpRequest();

        xhr.addEventListener('readystatechange', () =>{
  
          if(xhr.readyState === 4){
            console.log(xhr.response);
            var response = JSON.parse(xhr.responseText);
            if(response.message === 'Operacion exitosa'){
              if(this.updateToDo !== null){
                this.updateToDo();
                this.createToDo();
              } 
            }else{
              alert('no se pudo eliminar al profesor');
            }
             
          }
  
  
        });
  
        xhr.open('DELETE','http://localhost:8080/parcialApiRestSeguro/api/toDoing/delete/'+ this.toDoing.id);
        xhr.send();

    };

    deleteToDoingTask = () =>{
        let xhr = new XMLHttpRequest();

        xhr.addEventListener('readystatechange', () =>{
  
          if(xhr.readyState === 4){
            console.log(xhr.response);
            var response = JSON.parse(xhr.responseText);
            if(response.message === 'Operacion exitosa'){
              if(this.onDeleteFinish !== null){
                this.OnDeleteDoing();
              } 
            }else{
              alert('no se pudo eliminar al profesor');
            }
             
          }
  
  
        });
  
        xhr.open('DELETE','http://localhost:8080/parcialApiRestSeguro/api/toDoing/delete/'+ this.toDoing.id);
        xhr.send();

    }

    render = () =>{
        let downContainer = document.createElement('div');
        downContainer.className = 'downCon1';
        let headerContainer = document.createElement('div');
        headerContainer.className = 'header';
        let component = document.createElement('div'); //<div> </div>
        component.id = 'todoing' + this.toDoing.id;
        component.className = 'toDoComponent'; //<div class = 'profesorComponent'> </div>
        let description = document.createElement('p');//<p></p>
        description.className = 'descriptionName';
        let dateTask = document.createElement('small'); //<small></small>
        let delBtn = document.createElement('button');
        let updateBtn = document.createElement('button');
        let update2Btn = document.createElement('button');
  
        update2Btn.innerHTML = 'A';
        updateBtn.innerHTML = 'O';
        updateBtn.className = 'upBtn';
        delBtn.innerHTML = 'X';
        delBtn.className = 'delBtn';
  
        description.innerHTML = this.toDoing.description; //<p> Andres Andrade</p> Va dentro de la etiqueta
        description.className = 'TitleColor';
        dateTask.innerHTML = this.toDoing.dateTask;//<small>Ingenieria</small>
  
        headerContainer.appendChild(dateTask);
        headerContainer.appendChild(delBtn);
        downContainer.appendChild(update2Btn);
        downContainer.appendChild(updateBtn);
        component.appendChild(headerContainer);
        component.appendChild(downContainer);
        component.appendChild(description);
        component.appendChild(updateBtn);
     
  
        delBtn.addEventListener('click', this.deleteToDoingTask);
        update2Btn.addEventListener('click',this.deleteAndUpdateToDo);
        updateBtn.addEventListener('click',this.deleteAndUpdateToDone);
  
        return component;
      }

}