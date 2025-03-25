package com.awoo.pet.ui.exception;

public class NameRequiredException extends UiException {

    public NameRequiredException(){ super(UiErrorCode.NAME_REQUIRED); }
}
