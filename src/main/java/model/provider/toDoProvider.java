package model.provider;

import db.MySQLConnection;
import db.PoolConnection;
import entity.toDo;
import model.dto.toDoDTO;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;

public class toDoProvider {

    PoolConnection pool = PoolConnection.getInstance();

    public void createToDo(toDo todito){

        String sql = "INSERT INTO toDoRestrepo(nombreTarea,dateTask) VALUES ('$nombreTarea','$dateTask')";
        sql = sql.replace("$nombreTarea",todito.getDescription());
        sql = sql.replace("$dateTask", "" + todito.getDateTask());
        pool.getConexion().executeSQL(sql);

    }

    public ArrayList<toDoDTO> getAllToDoTasks(){
        ArrayList<toDoDTO> todosDTO = new ArrayList<toDoDTO>();
        MySQLConnection conexionAux = pool.getConexion();

        try{
            String sql = "SELECT id, nombreTarea, dateTask FROM toDoRestrepo";
            ResultSet resulset = conexionAux.Query(sql);

            while(resulset.next()){

                todosDTO.add(mapToDTOReverse(new toDo(
                    resulset.getInt(1),
                    resulset.getString(2),
                    resulset.getLong(3)
                )));

            }

        }catch (SQLException e){
            e.printStackTrace();
        }
        conexionAux.disconnect();
        return todosDTO;
    }

    public boolean deleteToDoTask(int id) {
        MySQLConnection connection = new MySQLConnection();
        String sql = "DELETE FROM toDoRestrepo WHERE toDoRestrepo.id=" + id;

        return connection.executeSQL(sql);
    }



    public toDo mapFromDTO(toDoDTO indeb){
        toDo in = new toDo();
        System.out.println("Holaaaaaaaaaa");
        System.out.println(indeb.getId() + "asda" + indeb.getDescription());
        System.out.println(indeb.getDateTask());
        if(indeb.getDateTask() == null){
            in.setDescription(indeb.getDescription());
            Date date = new Date();
            in.setDateTask(date.getTime());
        }else{
            in.setDescription(indeb.getDescription());
            long dateAux = Long.parseLong(indeb.getDateTask());
            Date date = new Date(dateAux);
            in.setDateTask(date.getTime());
        }

        return in;
    }


    public toDoDTO mapToDTOReverse(toDo p){
        toDoDTO profesordto = new toDoDTO();
        profesordto.setId(p.getId());
        profesordto.setDescription(p.getDescription());
        Date date = new Date(p.getDateTask());
        SimpleDateFormat df = new SimpleDateFormat("dd-MM-yyyy");
        String dateOriginal = df.format(date);
        profesordto.setDateTask(dateOriginal);
        return  profesordto;
    }


}
