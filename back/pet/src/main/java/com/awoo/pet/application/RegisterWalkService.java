package com.awoo.pet.application;

import com.awoo.pet.application.command.RegisterWalkCommand;

public interface RegisterWalkService {

    Integer registerWalk(RegisterWalkCommand command);

}
