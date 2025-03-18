package com.awoo.pet.application.impl;

import com.awoo.pet.application.RegisterPetService;
import com.awoo.pet.application.command.RegisterPetCommand;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RegisterPetServiceImpl implements RegisterPetService {


    @Override
    public Integer registerRet(final RegisterPetCommand command) {

        return 0;
    }
}
