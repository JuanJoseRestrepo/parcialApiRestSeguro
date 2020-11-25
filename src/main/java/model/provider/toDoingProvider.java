package model.provider;

import db.MySQLConnection;
import db.PoolConnection;
import entity.toDo;
import entity.toDoing;
import model.dto.toDoDTO;
import model.dto.toDoingDTO;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;

public class toDoingProvider {


    PoolConnection pool = PoolConnection.getInstance();

    public void createToDoing(toDoing todito){

        String sql = "INSERT INTO toDoingRestrepo(nombreTarea,dateTask) VALUES ('$nombreTarea','$dateTask')";
        sql = sql.replace("$nombreTarea",todito.getDescription());
        sql = sql.replace("$dateTask", "" + todito.getDateTask());
        pool.getConexion().executeSQL(sql);

    }

    public ArrayList<toDoingDTO> getAllToDoingTasks(){
        ArrayList<toDoingDTO> todosDTO = new ArrayList<toDoingDTO>();
        MySQLConnection conexionAux = pool.getConexion();

        try{
            String sql = "SELECT id, nombreTarea, dateTask FROM toDoingRestrepo";
            ResultSet resulset = conexionAux.Query(sql);

            while(resulset.next()){

                todosDTO.add(mapToDTOReverse(new toDoing(
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

    public boolean deleteToDoingTask(int id) {
        MySQLConnection connection = new MySQLConnection();
        String sql = "DELETE FROM toDoingRestrepo WHERE toDoingRestrepo.id=" + id;

        return connection.executeSQL(sql);
    }



    public toDoing mapFromDTO(toDoingDTO indeb){
        toDoing in = new toDoing();
        in.setDescription(indeb.getDescription());
        if(indeb.getDateTask().isEmpty()){
            Date date = new Date();
            in.setDateTask(date.getTime());
        }else{
            long dateAux = Long.parseLong(indeb.getDateTask());
            Date date = new Date(dateAux);
            in.setDateTask(date.getTime());
        }
        return in;
    }


    public toDoingDTO mapToDTOReverse(toDoing p){
        toDoingDTO profesordto = new toDoingDTO();
        profesordto.setId(p.getId());
        profesordto.setDescription(p.getDescription());
        Date date = new Date(p.getDateTask());
        SimpleDateFormat df = new SimpleDateFormat("dd-MM-yyyy");
        String dateOriginal = df.format(date);
        profesordto.setDateTask(dateOriginal);
        return  profesordto;
    }



}
