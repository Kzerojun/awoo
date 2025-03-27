package com.awoo.usedproduct.ui.exception;

import lombok.Getter;

@Getter
public class PriceRequiredException extends UiException {
    public PriceRequiredException(UiErrorCode uiErrorCode) {
        super(uiErrorCode);
    }
}