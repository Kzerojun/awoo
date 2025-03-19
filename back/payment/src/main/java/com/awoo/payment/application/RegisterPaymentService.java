package com.awoo.payment.application;

import com.awoo.payment.application.command.RegisterPaymentCommand;

public interface RegisterPaymentService {

    Integer registerPayment(RegisterPaymentCommand command);
}
