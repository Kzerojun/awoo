package com.awoo.usedproduct.application;

import com.awoo.usedproduct.application.command.MessageCommand;
import com.awoo.usedproduct.ui.facade.dto.response.FetchMessageResponse;

public interface ChatMessageService {

    FetchMessageResponse saveMessage(MessageCommand command);
}
