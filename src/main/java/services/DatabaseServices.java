package services;

import config.Response;
import db.PoolConnection;
import model.dto.toDoDTO;

import javax.ejb.Stateless;
import javax.ws.rs.*;
import java.util.ArrayList;

@Stateless
@Path("db")
public class DatabaseServices {

    @POST
    @Path("create")
    @Produces("application/json")
    public Response createDB(){
        PoolConnection pool = PoolConnection.getInstance();

        if(pool.getConexion().createDatabase()){
            return new Response("Base de datos creada con exito");
        }else{
            return new Response("Base de datos no fue creada");
        }
    }




}
