package com.awoo.calendar.application.exception;

import lombok.Getter;

@Getter
public class PetNotFoundException extends ApplicationException {

    public PetNotFoundException() {
        super(ApplicationErrorCode.PET_NOT_FOUND);
    }
}
