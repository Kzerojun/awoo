package com.awoo.pet.application.command.common;

import lombok.Builder;
import org.springframework.web.multipart.MultipartFile;

public record PetCommand(int memberId, String name, MultipartFile profileImage, String breed, int age, int savingId) {

    @Builder
    public PetCommand{

    }

}
