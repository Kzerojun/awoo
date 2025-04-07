package com.awoo.payment.application;

import com.awoo.payment.application.command.CommonPayCommand;

public interface CommonPayService {

    Integer commonPay(CommonPayCommand command);
}
