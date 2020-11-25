package entity;

public class toDoing {

    private int id;
    private String nombreTarea;
    private long dateTask;

    public toDoing() {
    }

    public toDoing(int id, String nombreTarea, long dateTask) {
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

    public String getDescription() {
        return nombreTarea;
    }

    public void setDescription(String description) {
        this.nombreTarea = description;
    }

    public long getDateTask() {
        return dateTask;
    }

    public void setDateTask(long dateTask) {
        this.dateTask = dateTask;
    }

}
