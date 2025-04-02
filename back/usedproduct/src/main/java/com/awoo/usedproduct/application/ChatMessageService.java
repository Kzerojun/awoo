package com.awoo.usedproduct.application;

import com.awoo.usedproduct.application.command.MessageCommand;

public interface ChatMessageService {

    Integer saveMessage(MessageCommand command);
}
