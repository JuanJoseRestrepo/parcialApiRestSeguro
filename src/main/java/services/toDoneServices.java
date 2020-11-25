package services;


import config.Response;
import model.dto.toDoneDTO;
import model.provider.toDoneProvider;

import javax.ejb.Stateless;
import javax.ws.rs.*;
import java.util.ArrayList;

@Stateless
@Path("toDone")
public class toDoneServices {

    @POST
    @Consumes("application/json")
    @Path("create")
    public Response createToDone(toDoneDTO todo){

        toDoneProvider provider = new toDoneProvider();
        provider.createToDone(provider.mapFromDTO(todo));
        return new Response("operacion exitosa");


    }

    @DELETE
    @Produces("application/json")
    @Path("delete/{id}")
    public Response deleteToDoneTask(@PathParam("id") String id){
        toDoneProvider provider = new toDoneProvider();
        boolean success = provider.deleteToDoneTask(Integer.parseInt(id));
        if(success) return new Response("Operacion exitosa");
        return new Response("Operacion Fallida");

    }

    @GET
    @Produces("application/json")
    @Path("all")
    public ArrayList<toDoneDTO> getAllToDoneTask(){
        toDoneProvider provider = new toDoneProvider();
        ArrayList<toDoneDTO> profe = provider.getAllToDoneTasks();
        return profe;

    }

}
