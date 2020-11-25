package services;

import config.Response;
import model.dto.toDoDTO;
import model.provider.toDoProvider;

import javax.ejb.Stateless;
import javax.ws.rs.*;
import java.util.ArrayList;

@Stateless
@Path("toDo")
public class toDoServices {

    @POST
    @Consumes("application/json")
    @Path("create")
    public Response createToDo(toDoDTO todo){

        toDoProvider provider = new toDoProvider();
        System.out.println(todo.getDescription());
        provider.createToDo(provider.mapFromDTO(todo));
        return new Response("operacion exitosa");


    }

    @DELETE
    @Produces("application/json")
    @Path("delete/{id}")
    public Response deleteToDoTask(@PathParam("id") String id){
        toDoProvider provider = new toDoProvider();
        boolean success = provider.deleteToDoTask(Integer.parseInt(id));
        if(success) return new Response("Operacion exitosa");
        return new Response("Operacion Fallida");

    }

    @GET
    @Produces("application/json")
    @Path("all")
    public ArrayList<toDoDTO> getAllToDoTask(){
        toDoProvider provider = new toDoProvider();
        ArrayList<toDoDTO> profe = provider.getAllToDoTasks();
        return profe;

    }


}
