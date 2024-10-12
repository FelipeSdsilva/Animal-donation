package com.felipesouls.animal_donate.factories;

import com.felipesouls.animal_donate.entities.Animal;
import com.felipesouls.animal_donate.entities.enums.Status;

import java.time.LocalDate;

public class Factory {

    public static Animal createAnimal(){
        Animal animal = new Animal();
        animal.setName("Default Animal");
        animal.setDescription("Default Description");
        animal.setImageUrl("http://defaultimage.com/default.png");
        animal.setCategory("Default Category");
        animal.setBirthDate(LocalDate.now());
        animal.setStatus(Status.AVAILABLE);
        return animal;
    }

}
