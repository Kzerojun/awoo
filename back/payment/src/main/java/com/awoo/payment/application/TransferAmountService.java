package com.awoo.payment.application;

import com.awoo.payment.application.command.TransferAmountCommand;

public interface TransferAmountService {

	Integer transferAmount(TransferAmountCommand command);
}
