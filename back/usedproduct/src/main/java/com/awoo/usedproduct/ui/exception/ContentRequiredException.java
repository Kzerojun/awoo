package com.awoo.usedproduct.ui.exception;

import lombok.Getter;

@Getter
public class ContentRequiredException extends UiException {
    public ContentRequiredException(UiErrorCode uiErrorCode) {
        super(uiErrorCode);
    }
}