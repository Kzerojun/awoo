package com.awoo.pet.ui.facade.dto.request;

import com.awoo.pet.application.command.ModifyPetCommand;
import com.awoo.pet.domain.pet.Pet;
import com.awoo.pet.ui.exception.AgeRequiredException;
import com.awoo.pet.ui.exception.BreedRequiredException;
import com.awoo.pet.ui.exception.NameRequiredException;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ModifyPetRequest {

    private String name;
    private String breed;
    private int age;

    public ModifyPetCommand toCommand(MultipartFile multipartFile, Integer petId) {
        validate();
        return new ModifyPetCommand(petId, multipartFile, name, breed, age);
    }

    private void validate(){
        if(name == null || name.isEmpty()){
            throw new NameRequiredException();
        }

        if(breed == null || breed.isEmpty()){
            throw new BreedRequiredException();
        }

        if(age <= 0){
            throw new AgeRequiredException();
        }
    }
}
