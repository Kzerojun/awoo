package com.awoo.usedproduct.ui.exception;

import lombok.Getter;

@Getter
public class PriceInvalidException extends UiException {
    public PriceInvalidException(UiErrorCode uiErrorCode) {
        super(uiErrorCode);
    }
}