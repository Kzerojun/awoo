package com.awoo.pet.ui.facade.dto.response;

import com.awoo.pet.domain.pet.Pet;
import lombok.Builder;
import lombok.Data;

import java.util.Map;

@Data
@Builder
public class SearchPetResponse {

    private int petId;
    private int memberId;
    private String name;
    private String profileImage;
    private String breed;
    private int age;
    private int savingId;
    private int walkInMonth;
    private String savingGrade;

    public static SearchPetResponse fromEntity(Map<String, Object> petInfo) {

        Pet entity = (Pet) petInfo.get("pet");
        int walkInMonth = (Integer) petInfo.get("walkInMonth");
        String savingGrade = (String) petInfo.get("grade");

        String profileUrl = null;

        if(entity.getProfileImage() != null) {
            profileUrl = "https://c209awoo.s3.us-east-2.amazonaws.com/" + entity.getProfileImage();
        }

        return SearchPetResponse.builder()
                .petId(entity.getPetId())
                .memberId(entity.getMemberId())
                .name(entity.getName())
                .profileImage(profileUrl)
                .breed(entity.getBreed())
                .age(entity.getAge())
                .savingId(entity.getSavingId())
                .walkInMonth(walkInMonth)
                .savingGrade(savingGrade)
                .build();
    }

}
