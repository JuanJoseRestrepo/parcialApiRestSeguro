package model.provider;

import db.MySQLConnection;
import db.PoolConnection;
import entity.toDo;
import entity.toDoing;
import model.dto.toDoDTO;
import model.dto.toDoingDTO;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.ParseException;
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
        try{

            if(indeb.getDateTask() == null){
                in.setDescription(indeb.getDescription());
                Date date = new Date();
                in.setDateTask(date.getTime());
            }else{
                in.setDescription(indeb.getDescription());
                String msj = indeb.getDateTask();
                SimpleDateFormat f = new SimpleDateFormat("dd-MM-yyyy");
                Date d = (Date)f.parse(msj);
                long milliseconds = d.getTime();
                in.setDateTask(milliseconds);
            }

        }catch(ParseException e){
            e.printStackTrace();
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
