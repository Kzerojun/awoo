package com.awoo.payment.ui.facade.dto.request;

import com.awoo.payment.application.command.RegisterPaymentPasswordCommand;
import com.awoo.payment.ui.exception.PasswordInvalidFormatException;
import com.awoo.payment.ui.exception.PasswordRequiredException;

public record RegisterPaymentPasswordRequest(String password) {

    public RegisterPaymentPasswordCommand toCommand(Integer memberId) {
        validate();
        return RegisterPaymentPasswordCommand.builder()
                .memberId(memberId)
                .password(password)
                .build();
    }

    private void validate(){
        validatePassword();
    }

    private void validatePassword(){
        if(password.isBlank()){
            throw new PasswordRequiredException();
        }

        if (!password.matches("\\d{6}")) { // 6자리 숫자 검증
            throw new PasswordInvalidFormatException();
        }
    }
}
