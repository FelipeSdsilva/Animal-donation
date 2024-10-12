package com.felipesouls.animal_donate.repositories;

import com.felipesouls.animal_donate.entities.Animal;
import com.felipesouls.animal_donate.entities.enums.Status;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface AnimalRepository extends JpaRepository<Animal, Long> {

    @Modifying
    @Query("UPDATE Animal a SET a.status = :status WHERE a.id = :id")
    int updateStatusById(Long id, Status status);
}