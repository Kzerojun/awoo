package com.awoo.pet.domain.pet;

import com.awoo.pet.application.command.RegisterPetCommand;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PetFactory {

    public Pet registerPetEntity(final RegisterPetCommand command) {
        // 유저 정보 확인하고
        return Pet.builder()
                .memberId(command.petCommand().memberId())
                .name(command.petCommand().name())
                .profileImage(command.petCommand().profileImage())
                .breed(command.petCommand().breed())
                .age(command.petCommand().age())
                .savingId(command.petCommand().savingId())
                .build();
    }
}
