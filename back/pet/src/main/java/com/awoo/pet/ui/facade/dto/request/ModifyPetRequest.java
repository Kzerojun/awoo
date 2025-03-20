package com.awoo.pet.ui.facade.dto.request;

import com.awoo.pet.application.command.ModifyPetCommand;
import com.awoo.pet.domain.pet.Pet;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ModifyPetRequest {

    private String name;
    private String profileImage;
    private String breed;
    private int age;

    public ModifyPetCommand toCommand(Integer petId) {
        return new ModifyPetCommand(petId ,name, profileImage, breed, age);
    }
}
