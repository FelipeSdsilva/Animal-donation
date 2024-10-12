package com.felipesouls.animal_donate.repositories;

import com.felipesouls.animal_donate.entities.Animal;
import com.felipesouls.animal_donate.entities.enums.Status;
import com.felipesouls.animal_donate.factories.Factory;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
class AnimalRepositoryTests {

    @Autowired
    private AnimalRepository animalRepository;

    @Test
    public void testCreateAnimal() {
        Animal animal = Factory.createAnimal();

        Animal savedAnimal = animalRepository.save(animal);

        assertThat(savedAnimal.getId()).isNotNull();
        assertThat(savedAnimal.getName()).isEqualTo("Default Animal");
    }


    @Test
    public void findAllShouldReturnAllObjects() {
        List<Animal> animals = animalRepository.findAll();

        assertThat(animals).isNotEmpty();
    }

    @Test
    public void updateAnimalStatusShouldReturnNumberOneWhenExist() {
        Animal animal = Factory.createAnimal();

        animalRepository.save(animal);

        int update = animalRepository.updateStatusById(animal.getId(), Status.AVAILABLE);

        assertThat(animal.getStatus()).isEqualTo(Status.AVAILABLE);
        Assertions.assertEquals(update, 1);
    }
}