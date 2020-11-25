package config;


import services.*;

import javax.ws.rs.ApplicationPath;
import javax.ws.rs.core.Application;
import java.util.HashSet;
import java.util.Set;

@ApplicationPath("api") //Abre la puerta para generar servicios
public class ApplicationConfig extends Application {

    //Control + o

    //Lista de recursos para que conozca los servicios
    @Override
    public Set<Class<?>> getClasses() {
        Set<Class<?>> resources = new HashSet<>();
        resources.add(DatabaseServices.class);
        resources.add(toDoServices.class);
        resources.add(toDoingServices.class);
        resources.add(toDoneServices.class);
        return resources;
    }
}

