package com.awoo.pet.application.impl;


import com.awoo.pet.application.RegisterWalkService;
import com.awoo.pet.application.command.RegisterWalkCommand;
import com.awoo.pet.domain.walk.Walk;
import com.awoo.pet.domain.walk.WalkFactory;
import com.awoo.pet.domain.walk.WalkRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RegisterWalkServiceImpl implements RegisterWalkService {

    private final WalkFactory walkFactory;
    private final WalkRepository walkRepository;

    @Override
    @Transactional
    public Integer registerWalk(final RegisterWalkCommand command) {
        Walk entity = walkFactory.registerWalk(command);
        walkRepository.registerWalk(entity);
        return entity.getWalkId();
    }
}
