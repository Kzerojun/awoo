package com.awoo.payment.application;

import com.awoo.payment.application.command.ConfirmSafeTransactionCommand;
import com.awoo.payment.application.command.SafePayCommand;

public interface SafePayService {

    Integer safePay(SafePayCommand command);

    void confirmSafeTransaction(ConfirmSafeTransactionCommand command);
}
