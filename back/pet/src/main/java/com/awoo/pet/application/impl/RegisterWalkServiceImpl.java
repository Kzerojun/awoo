package com.awoo.pet.application.impl;


import com.awoo.pet.application.RegisterWalkService;
import com.awoo.pet.application.command.RegisterWalkCommand;
import com.awoo.pet.application.exception.ApplicationErrorCode;
import com.awoo.pet.application.exception.PetNotFoundException;
import com.awoo.pet.application.exception.WalkRegisterException;
import com.awoo.pet.domain.pet.Pet;
import com.awoo.pet.domain.pet.PetRepository;
import com.awoo.pet.domain.walk.Walk;
import com.awoo.pet.domain.walk.WalkFactory;
import com.awoo.pet.domain.walk.WalkRepository;
import com.awoo.pet.support.kafka.KafkaProducer;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class RegisterWalkServiceImpl implements RegisterWalkService {

    private final WalkFactory walkFactory;
    private final WalkRepository walkRepository;
    private final PetRepository petRepository;
    private final KafkaProducer kafkaProducer;

    @Override
    public Integer registerWalk(final RegisterWalkCommand command) {
        Pet pet = petRepository.searchPet(command.walkCommand().petId()).orElseThrow(() -> new PetNotFoundException(ApplicationErrorCode.PET_NOT_FOUND));
        Walk entity = walkFactory.registerWalk(command);
        try{
            walkRepository.registerWalk(entity);
        }catch(Exception e){
            throw new WalkRegisterException(ApplicationErrorCode.WALk_REGISTRATION_FAILED);
        }

        DateTimeFormatter formatter = DateTimeFormatter.ISO_LOCAL_DATE_TIME;
        String date = entity.getStartTime().format(DateTimeFormatter.ofPattern("MM-dd"));

        Map<String, Object> kafkaMessage = new HashMap<>();
        kafkaMessage.put("petId", entity.getPetId());
        kafkaMessage.put("memberId", entity.getMemberId());
        kafkaMessage.put("scheduleContent", date +" " + pet.getName() + "의 산책");
        kafkaMessage.put("startTime", entity.getStartTime().format(formatter));
        kafkaMessage.put("endTime", entity.getEndTime().format(formatter));

        kafkaProducer.sendMessage("pet.walk.register.v1", kafkaMessage);

        return entity.getWalkId();
    }
}
