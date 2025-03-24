package com.awoo.pet.application.command.common;

import lombok.Builder;

import java.time.LocalDateTime;

public record WalkCommand(int memberId, int petId, LocalDateTime startTime, LocalDateTime endTime, double distance) {

    @Builder
    public WalkCommand{

    }
}
