package com.awoo.pet.ui.facade.dto.response;

import com.awoo.pet.domain.pet.Pet;
import com.awoo.pet.ui.facade.dto.response.common.PetResponse;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class RegisterPetResponse {

    private int petId;
    private int memberId;
    private String name;
    private String profileImage;
    private String breed;
    private int age;
    private int savingId;

    public static RegisterPetResponse fromEntity(Pet entity){
        return RegisterPetResponse.builder()
                .petId(entity.getPetId())
                .memberId(entity.getMemberId())
                .name(entity.getName())
                .profileImage(entity.getProfileImage())
                .breed(entity.getBreed())
                .age(entity.getAge())
                .savingId(entity.getSavingId())
                .build();
    }
}
