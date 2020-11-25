package services;

import config.Response;
import model.dto.toDoingDTO;
import model.provider.toDoingProvider;

import javax.ejb.Stateless;
import javax.ws.rs.*;
import java.util.ArrayList;

@Stateless
@Path("toDoing")
public class toDoingServices {

    @POST
    @Consumes("application/json")
    @Path("create")
    public Response createToDoing(toDoingDTO todo){

        toDoingProvider provider = new toDoingProvider();
        System.out.println(todo.getDescription() + "brrrrr");
        System.out.println(todo.getDateTask() + "brrr");
        provider.createToDoing(provider.mapFromDTO(todo));
        return new Response("operacion exitosa");


    }

    @DELETE
    @Produces("application/json")
    @Path("delete/{id}")
    public Response deleteToDoingTask(@PathParam("id") String id){
        toDoingProvider provider = new toDoingProvider();
        boolean success = provider.deleteToDoingTask(Integer.parseInt(id));
        if(success) return new Response("Operacion exitosa");
        return new Response("Operacion Fallida");

    }

    @GET
    @Produces("application/json")
    @Path("all")
    public ArrayList<toDoingDTO> getAllToDoingTask(){
        toDoingProvider provider = new toDoingProvider();
        ArrayList<toDoingDTO> profe = provider.getAllToDoingTasks();
        return profe;

    }

}
