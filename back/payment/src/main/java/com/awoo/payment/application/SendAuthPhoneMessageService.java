package com.awoo.payment.application;

import com.awoo.payment.application.command.SendAuthPhoneMessageCommand;

public interface SendAuthPhoneMessageService {

    void sendAuthPhoneMessage(SendAuthPhoneMessageCommand command);
}
