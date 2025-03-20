package com.awoo.pet.ui.facade.dto.request;

import com.awoo.pet.application.command.RegisterPetCommand;
import com.awoo.pet.application.command.common.PetCommand;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterPetRequest {

    private String name;
    private String profileImage;
    private String breed;
    private int age;

    public RegisterPetCommand toCommand(Integer memberId) {
        return new RegisterPetCommand(
                PetCommand.builder()
                        .memberId(memberId)
                        .name(name)
                        .profileImage(profileImage)
                        .breed(breed)
                        .age(age)
                        .build()
        );
    }

}
