package com.awoo.pet.application.impl;

import com.awoo.pet.application.AwsS3Service;
import com.awoo.pet.application.ModifyPetService;
import com.awoo.pet.application.command.ModifyPetCommand;
import com.awoo.pet.application.exception.ApplicationErrorCode;
import com.awoo.pet.application.exception.FileModifyFailedException;
import com.awoo.pet.application.exception.PetModifyException;
import com.awoo.pet.application.exception.PetNotFoundException;
import com.awoo.pet.domain.pet.Pet;
import com.awoo.pet.domain.pet.PetRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ModifyPetServiceImpl implements ModifyPetService {

    private final PetRepository petRepository;
    private final AwsS3Service awsS3Service;

    @Override
    @Transactional
    public Pet modifyPet(final ModifyPetCommand command) {
        Pet entity = petRepository.searchPet(command.petId()).orElseThrow(() -> new PetNotFoundException(ApplicationErrorCode.PET_NOT_FOUND));

        String profileImageUrl = null;
        if(command.profileImage() != null) {

            if(entity.getProfileImage() != null) {
                awsS3Service.deleteFile(entity.getProfileImage());
            }

            profileImageUrl = awsS3Service.upload(command.profileImage());
            try{
                entity.modifyPetProfile(profileImageUrl);
            }catch(Exception e){
                throw new FileModifyFailedException(ApplicationErrorCode.PET_PROFILE_MODIFY_FAILED);
            }
        }

        try{
            entity.modifyPet(command);
        }catch(Exception e){
            throw new PetModifyException(ApplicationErrorCode.PET_MODIFY_FAILED);
        }

        return entity;
    }
}
