package com.awoo.payment.ui.facade;

import com.awoo.payment.application.command.*;
import com.awoo.payment.application.query.FetchBalanceQuery;
import com.awoo.payment.ui.facade.dto.response.*;

public interface PaymentServiceFacade {

    RegisterPaymentResponse register(RegisterPaymentCommand command);

    RegisterPaymentPasswordResponse registerPassword(RegisterPaymentPasswordCommand command);

    FetchBalanceResponse fetchBalance(FetchBalanceQuery query);

    ChargeBalanceResponse chargeBalance(ChargeBalanceCommand command);

    SendAuthPhoneMessageResponse sendAuthPhoneMessage(SendAuthPhoneMessageCommand command);

    CheckAuthCodeResponse checkAuthCode(CheckAuthCodeCommand command);

    RemitOneWonResponse remitOneWon(RemitOneWonCommand command);

    VerifyOneWonResponse verifyOneWon(VerifyOneWonCommand command);

    VerifyPaymentPasswordResponse verifyPassword(VerifyPaymentPasswordCommand command);

    FetchPaymentResponse fetchAccount(Integer memberId);

    TransferAmountResponse transferAmount(TransferAmountCommand amountCommand);
}
