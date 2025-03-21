package com.awoo.pet.application.command;

public record ModifyPetCommand(Integer petId, String name, String profileImage, String breed, int age) {

}
