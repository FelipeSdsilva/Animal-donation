package com.felipesouls.animal_donate.controllers;

import com.felipesouls.animal_donate.dto.AnimalDTO;
import com.felipesouls.animal_donate.entities.enums.Status;
import com.felipesouls.animal_donate.records.AnimalRequest;
import com.felipesouls.animal_donate.servicies.AnimalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.springframework.web.servlet.support.ServletUriComponentsBuilder.fromCurrentRequest;

@RestController
@CrossOrigin("*")
@RequestMapping(value = "/animals")
public class AnimalController {

    @Autowired
    private AnimalService animalService;

    @GetMapping
    public ResponseEntity<List<AnimalDTO>> getAllAnimals() {
        return ResponseEntity.ok(animalService.getAllAnimals());
    }

    @PostMapping
    public ResponseEntity<AnimalDTO> createAnimal(@RequestBody AnimalRequest animal) {
        AnimalDTO animalDTO = animalService.createAnimal(animal);
        var uri = fromCurrentRequest().path("/{id}").buildAndExpand(animalDTO.getId()).toUri();
        return ResponseEntity.created(uri).body(animalDTO);
    }

    @PatchMapping(value = "/{id}/{status}")
    public ResponseEntity<AnimalDTO> updateAnimalStatus(@PathVariable Long id, @PathVariable Status status) {
        animalService.updateAnimalStatus(id, status);
        return ResponseEntity.noContent().build();
    }
}
