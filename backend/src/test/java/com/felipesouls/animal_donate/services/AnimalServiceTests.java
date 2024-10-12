package com.felipesouls.animal_donate.services;

import com.felipesouls.animal_donate.dto.AnimalDTO;
import com.felipesouls.animal_donate.entities.Animal;
import com.felipesouls.animal_donate.entities.enums.Status;
import com.felipesouls.animal_donate.records.AnimalRequest;
import com.felipesouls.animal_donate.repositories.AnimalRepository;
import com.felipesouls.animal_donate.servicies.AnimalService;
import jakarta.persistence.EntityNotFoundException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(SpringExtension.class)
class AnimalServiceTests {

    @InjectMocks
    private AnimalService animalService;

    @Mock
    private AnimalRepository animalRepository;

    private Animal animal;
    private AnimalRequest animalRequest;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        animal = new Animal();
        animal.setId(1L);
        animal.setName("Rex");
        animal.setStatus(Status.AVAILABLE);

        animalRequest = new AnimalRequest("Rex", "Friendly dog", "img.jpg", "Dog", null, Status.AVAILABLE);
    }

    @Test
    void getAllAnimalsShouldReturnListOfAnimalDTOs() {
        when(animalRepository.findAll()).thenReturn(List.of(animal));

        List<AnimalDTO> result = animalService.getAllAnimals();

        assertEquals(1, result.size());
        assertEquals("Rex", result.get(0).getName());
        verify(animalRepository, times(1)).findAll();
    }

    @Test
    void createAnimalShouldReturnAnimalDTO() {
        when(animalRepository.save(any(Animal.class))).thenReturn(animal);

        AnimalDTO result = animalService.createAnimal(animalRequest);

        assertNotNull(result);
        assertEquals("Rex", result.getName());
        verify(animalRepository, times(1)).save(any(Animal.class));
    }

    @Test
    void updateAnimalStatusShouldUpdateStatus() {
        when(animalRepository.updateStatusById(1L, Status.ADOPTED)).thenReturn(1);

        assertDoesNotThrow(() -> animalService.updateAnimalStatus(1L, Status.ADOPTED));
        verify(animalRepository, times(1)).updateStatusById(1L, Status.ADOPTED);
    }

    @Test
    void updateAnimalStatusShouldThrowEntityNotFoundException() {
        when(animalRepository.updateStatusById(1L, Status.ADOPTED)).thenReturn(0);

        EntityNotFoundException exception = assertThrows(EntityNotFoundException.class,
                () -> animalService.updateAnimalStatus(1L, Status.ADOPTED));

        assertEquals("Animal not found with id: 1", exception.getMessage());
        verify(animalRepository, times(1)).updateStatusById(1L, Status.ADOPTED);
    }
}
