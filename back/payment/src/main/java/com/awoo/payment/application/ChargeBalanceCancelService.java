package com.awoo.payment.application;

import com.awoo.payment.application.command.ChargeBalanceCancelCommand;

public interface ChargeBalanceCancelService {


	void cancelCharge(ChargeBalanceCancelCommand command);

}
