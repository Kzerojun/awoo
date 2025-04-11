package com.awoo.usedproduct.application;

import com.awoo.usedproduct.application.command.CreateChatRoomCommand;

public interface CreateRoomService {

    Integer createChatRoom(CreateChatRoomCommand command);
}
