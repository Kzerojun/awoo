package com.awoo.pet.application.command.common;

import lombok.Builder;

public record PetCommand(int memberId, String name, String profileImage, String breed, int age, int savingId) {

    @Builder
    public PetCommand{

    }

}
