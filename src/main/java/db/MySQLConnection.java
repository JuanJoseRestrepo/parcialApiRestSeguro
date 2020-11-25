package db;

import javax.ejb.Stateless;
import java.sql.*;

public class MySQLConnection {

    private Connection connection;
    private boolean inUse;

    public MySQLConnection(){
        try {
            Class.forName("com.mysql.cj.jdbc.Driver"); //Importacion
            inUse = false;
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        }
    }

    public void connect(){
        String url = "jdbc:mysql://200.3.193.22:3306/P09728_1_11";
        try {
            connection = DriverManager.getConnection(url,"P09728_1_11","ZCSaQGZU");
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }
    }

    public void disconnect(){

        try {
            connection.close();
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }

    }


    public boolean createDatabase(){
        boolean succes = false;
        try {
            connect();
            Statement statement = connection.createStatement();
            statement.execute("CREATE TABLE IF NOT EXISTS toDoRestrepo(id INT PRIMARY  KEY AUTO_INCREMENT,nombreTarea VARCHAR(200), dateTask NUMERIC(50,0))");
            statement.execute("CREATE TABLE IF NOT EXISTS toDoingRestrepo(id INT PRIMARY  KEY AUTO_INCREMENT,nombreTarea VARCHAR(100), dateTask NUMERIC(50,0))");
            statement.execute("CREATE TABLE IF NOT EXISTS toDoneRestrepo(id INT PRIMARY  KEY AUTO_INCREMENT,nombreTarea VARCHAR(100), dateTask NUMERIC(50,0))");
            succes = true;
        } catch (SQLException throwables) {
            throwables.printStackTrace();
            succes = false;
        }finally {
            disconnect();
        }
        return succes;
    }

    //Acciones: insertar, hacer update, crear o eliminar.
    public boolean executeSQL(String sql){
        connect();
        boolean t = false;
        try {
            Statement statement = connection.createStatement();
            statement.execute(sql);
            t = true;
            inUse = false;
        } catch (SQLException throwables) {
            throwables.printStackTrace();
            t = false;
        }finally {
            disconnect();
        }
        return t;
    }

    //Esto es solamente para los resultsSets
    public ResultSet Query(String sql) {
        ResultSet output = null;
        try {
            connect();
            Statement statement = connection.createStatement();
            output = statement.executeQuery(sql);
            inUse = false;
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }finally {
            // disconnect();
        }
        return output;
    }

    public boolean isInUse() {
        return inUse;
    }

    public void setInUse(boolean inUse) {
        this.inUse = inUse;
    }

}
