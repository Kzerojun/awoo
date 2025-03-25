package com.awoo.payment.ui.facade;

import com.awoo.payment.application.command.ChargeBalanceCommand;
import com.awoo.payment.application.command.RegisterPaymentCommand;
import com.awoo.payment.application.command.RegisterPaymentPasswordCommand;
import com.awoo.payment.application.command.SendAuthPhoneMessageCommand;
import com.awoo.payment.application.query.FetchBalanceQuery;
import com.awoo.payment.ui.facade.dto.response.*;

public interface PaymentServiceFacade {

    RegisterPaymentResponse register(RegisterPaymentCommand command);

    RegisterPaymentPasswordResponse registerPassword(RegisterPaymentPasswordCommand command);

    FetchBalanceResponse fetchBalance(FetchBalanceQuery query);

    ChargeBalanceResponse chargeBalance(ChargeBalanceCommand command);

    SendAuthPhoneMessageResponse sendAuthPhoneMessage(SendAuthPhoneMessageCommand command);


}
