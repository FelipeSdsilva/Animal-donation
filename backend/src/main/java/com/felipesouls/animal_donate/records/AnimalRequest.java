package com.felipesouls.animal_donate.records;

import com.felipesouls.animal_donate.entities.enums.Status;
import jakarta.validation.constraints.NotBlank;

import java.time.LocalDate;

public record AnimalRequest(
        @NotBlank
        String name,
        @NotBlank
        String description,
        String imageUrl,
        String category,
        LocalDate birthDate,
        Status status
) {
}
