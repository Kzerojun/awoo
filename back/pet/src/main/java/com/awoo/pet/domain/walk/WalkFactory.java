package com.awoo.pet.domain.walk;

import com.awoo.pet.application.command.RegisterWalkCommand;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class WalkFactory {

    public Walk registerWalk(final RegisterWalkCommand command, final String isSaving) {
        return Walk.builder()
                .memberId(command.walkCommand().memberId())
                .petId(command.walkCommand().petId())
                .startTime(command.walkCommand().startTime())
                .endTime(command.walkCommand().endTime())
                .distance(command.walkCommand().distance())
                .isSaving(isSaving)
                .build();
    }
}
