package db;

import java.util.ArrayList;

public class PoolConnection {

    private static PoolConnection connection;
    private ArrayList<MySQLConnection> conexiones;

    public static synchronized PoolConnection getInstance(){
        if(connection == null){
            connection = new PoolConnection();
        }
        return connection;
    }

    private PoolConnection(){
        conexiones = new ArrayList<>();
        for (int i = 0; i < 10; i++){
            MySQLConnection sql = new MySQLConnection();
            sql.connect();
            sql.createDatabase();
            conexiones.add(sql);
        }
    }

    public MySQLConnection getConexion(){
        MySQLConnection sql = null;
        boolean finded = false;
        for (int i = 0; i < conexiones.size() && !finded; i++){
            if(!conexiones.get(i).isInUse()){
                sql = conexiones.get(i);
                finded = true;
                sql.setInUse(true);
            }
        }
        if(sql == null){
            generateMoreConexions();
            sql = getConexion();
        }
        return sql;
    }

    public void generateMoreConexions(){
        for (int i = 0; i < 8; i++){
            MySQLConnection sql = new MySQLConnection();
            sql.connect();
            sql.createDatabase();
            conexiones.add(sql);
        }
    }
}
