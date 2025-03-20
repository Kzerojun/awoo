package com.awoo.payment.ui.facade;

import com.awoo.payment.application.command.RegisterPaymentCommand;
import com.awoo.payment.application.command.RegisterPaymentPasswordCommand;
import com.awoo.payment.ui.facade.dto.response.RegisterPaymentPasswordResponse;
import com.awoo.payment.ui.facade.dto.response.RegisterPaymentResponse;

public interface PaymentServiceFacade {

    RegisterPaymentResponse register(RegisterPaymentCommand command);

    RegisterPaymentPasswordResponse registerPassword(RegisterPaymentPasswordCommand command);
}
