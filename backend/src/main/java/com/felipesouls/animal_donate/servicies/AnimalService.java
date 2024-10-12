package com.felipesouls.animal_donate.servicies;

import com.felipesouls.animal_donate.dto.AnimalDTO;
import com.felipesouls.animal_donate.entities.Animal;
import com.felipesouls.animal_donate.entities.enums.Status;
import com.felipesouls.animal_donate.records.AnimalRequest;
import com.felipesouls.animal_donate.repositories.AnimalRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class AnimalService {

    @Autowired
    private AnimalRepository animalRepository;

    @Transactional(readOnly = true)
    public List<AnimalDTO> getAllAnimals() {
        return animalRepository.findAll().stream().map(AnimalDTO::new).toList();
    }

    @Transactional
    public AnimalDTO createAnimal(AnimalRequest animal) {
        Animal newAnimal = new Animal();
        converterDtoInEntity(newAnimal, animal);
        newAnimal = animalRepository.save(newAnimal);
        return new AnimalDTO(newAnimal);
    }

    @Transactional
    public void updateAnimalStatus(Long id, Status status) {
        int updatedRows = animalRepository.updateStatusById(id, status);
        if (updatedRows == 0) {
            throw new EntityNotFoundException("Animal not found with id: " + id);
        }
    }

    private void converterDtoInEntity(Animal animal, AnimalRequest request) {
        animal.setName(request.name());
        animal.setDescription(request.description());
        animal.setImageUrl(request.imageUrl());
        animal.setCategory(request.category());
        animal.setBirthDate(request.birthDate());
        animal.setStatus(request.status());
    }

}
