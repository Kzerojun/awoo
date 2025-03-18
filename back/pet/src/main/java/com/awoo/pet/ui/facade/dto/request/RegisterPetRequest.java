package com.awoo.pet.ui.facade.dto.request;

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

}
