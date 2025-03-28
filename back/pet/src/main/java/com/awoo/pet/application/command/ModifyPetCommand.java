package com.awoo.pet.application.command;

import org.springframework.web.multipart.MultipartFile;

public record ModifyPetCommand(Integer petId, MultipartFile profileImage, String name, String breed, int age) {

}
