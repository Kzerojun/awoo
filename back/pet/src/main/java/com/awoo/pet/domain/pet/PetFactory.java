package com.awoo.pet.domain.pet;

import com.awoo.pet.application.command.RegisterPetCommand;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PetFactory {

    public Pet registerPetEntity(final RegisterPetCommand command, final String profileImageUrl) {

        return Pet.builder()
                .memberId(command.petCommand().memberId())
                .name(command.petCommand().name())
                .profileImage(profileImageUrl)
                .breed(command.petCommand().breed())
                .age(command.petCommand().age())
                .savingId(command.petCommand().savingId())
                .savingLevel(command.petCommand().savingLevel())
                .animalRegNumber(command.petCommand().animalRegNumber())
                .ocrImageUrl(command.petCommand().ocrImageUrl())
                .build();
    }
}
