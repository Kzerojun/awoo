package com.awoo.usedproduct.application;

import com.awoo.usedproduct.application.command.LikeCommand;

public interface LikeService {

    boolean like(LikeCommand command);
}
