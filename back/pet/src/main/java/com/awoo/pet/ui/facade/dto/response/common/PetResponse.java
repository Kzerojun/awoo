package com.awoo.pet.ui.facade.dto.response.common;

import com.awoo.pet.domain.pet.Pet;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class PetResponse {

    private int petId;
    private int memberId;
    private String name;
    private String profileImage;
    private String breed;
    private int age;
    private int savingId;

    public static PetResponse fromEntity(Pet entity){
        return PetResponse.builder()
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
