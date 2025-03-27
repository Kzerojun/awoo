package com.awoo.usedproduct.ui.exception;

import lombok.Getter;

@Getter
public class TitleRequiredException extends UiException {
    public TitleRequiredException(UiErrorCode uiErrorCode) {
        super(uiErrorCode);
    }
}