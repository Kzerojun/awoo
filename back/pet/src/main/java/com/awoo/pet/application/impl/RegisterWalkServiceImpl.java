package com.awoo.pet.application.impl;


import com.awoo.pet.application.RegisterWalkService;
import com.awoo.pet.application.command.RegisterWalkCommand;
import com.awoo.pet.domain.walk.Walk;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RegisterWalkServiceImpl implements RegisterWalkService {


    @Override
    @Transactional
    public Integer registerWalk(final RegisterWalkCommand command) {
        Walk entity =
        return 0;
    }
}
