package com.awoo.pet.ui.facade.dto.request;

import com.awoo.pet.application.command.RegisterPetCommand;
import com.awoo.pet.application.command.common.PetCommand;
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
public class RegisterPetRequest {

    private String name;
    private String breed;
    private String animalRegNumber;
    private String ocrImageUrl;
    private int age;

    public RegisterPetCommand toCommand(Integer memberId, MultipartFile profileImage) {
        validate();
        System.out.println(profileImage);
        return new RegisterPetCommand(
                PetCommand.builder()
                        .memberId(memberId)
                        .name(name)
                        .profileImage(profileImage)
                        .breed(breed)
                        .animalRegNumber(animalRegNumber)
                        .ocrImageUrl(ocrImageUrl)
                        .age(age)
                        .build()
        );
    }

    private void validate(){
        if(name == null || name.isEmpty()){
            throw new NameRequiredException();
        }

        if(breed == null || breed.isEmpty()){
            throw new BreedRequiredException();
        }

        if(animalRegNumber == null || animalRegNumber.isEmpty()){
            throw new BreedRequiredException();
        }

        if(ocrImageUrl == null || ocrImageUrl.isEmpty()){
            throw new BreedRequiredException();
        }

        if(age <= 0){
            throw new AgeRequiredException();
        }
    }

}
