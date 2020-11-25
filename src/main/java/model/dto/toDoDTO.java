package model.dto;

public class toDoDTO {

    private int id;
    private String nombreTarea;
    private String dateTask;

    public toDoDTO() {
    }

    public toDoDTO(int id,String nombreTarea, String dateTask) {
        this.id = id;
        this.nombreTarea = nombreTarea;
        this.dateTask = dateTask;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getDateTask() {
        return dateTask;
    }

    public void setDateTask(String dateTask) {
        this.dateTask = dateTask;
    }

    public String getDescription() {
        return nombreTarea;
    }

    public void setDescription(String description) {
        this.nombreTarea = description;
    }

}
