package com.felipesouls.animal_donate.dto;

import com.felipesouls.animal_donate.entities.Animal;
import com.felipesouls.animal_donate.entities.enums.Status;
import org.springframework.beans.BeanUtils;

import java.time.LocalDate;

public class AnimalDTO {

    private Long id;
    private String name;
    private String description;
    private String imageUrl;
    private String category;
    private LocalDate birthDate;
    private Status status;

    public AnimalDTO(Long id, String name, String description, String imageUrl, String category, LocalDate birthDate, Status status) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.imageUrl = imageUrl;
        this.category = category;
        this.birthDate = birthDate;
        this.status = status;
    }

    public AnimalDTO(Animal animal) {
        BeanUtils.copyProperties(animal, this);
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public LocalDate getBirthDate() {
        return birthDate;
    }

    public void setBirthDate(LocalDate birthDate) {
        this.birthDate = birthDate;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }
}
