package com.awoo.calendar.ui.exception;

public class PetIdRequiredException extends UiException {

    public PetIdRequiredException(){
        super(UiErrorCode.PET_ID_REQUIRED);
    }
}
