package com.awoo.pet.application.impl;

import com.awoo.pet.application.AwsS3Service;
import com.awoo.pet.application.RegisterPetService;
import com.awoo.pet.application.command.RegisterPetCommand;
import com.awoo.pet.application.exception.ApplicationErrorCode;
import com.awoo.pet.application.exception.PetRegisterException;
import com.awoo.pet.domain.pet.Pet;
import com.awoo.pet.domain.pet.PetFactory;
import com.awoo.pet.domain.pet.PetRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import net.sourceforge.tess4j.Tesseract;
import org.springframework.stereotype.Service;

import java.io.File;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
@RequiredArgsConstructor
public class RegisterPetServiceImpl implements RegisterPetService {

    private final AwsS3Service awsS3Service;
    private final PetFactory petFactory;
    private final PetRepository petRepository;

    @Override
    public Pet registerPet(final RegisterPetCommand command) {

        String profileImageUrl = null;
        if(command.petCommand().profileImage() != null) {
            profileImageUrl = awsS3Service.upload(command.petCommand().profileImage());
        }

        Pet entity = petFactory.registerPetEntity(command, profileImageUrl);
        try{
            petRepository.registerPet(entity);
        }catch (Exception e){
            throw new PetRegisterException(ApplicationErrorCode.PET_REGISTRATION_FAILED);
        }
        return entity;
    }
}
