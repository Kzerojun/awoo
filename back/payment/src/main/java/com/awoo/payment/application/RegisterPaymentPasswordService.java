package com.awoo.payment.application;

import com.awoo.payment.application.command.RegisterPaymentPasswordCommand;

public interface RegisterPaymentPasswordService {

    void registerPassword(RegisterPaymentPasswordCommand command);
}
