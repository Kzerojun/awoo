package com.awoo.payment.application;

import com.awoo.payment.application.command.CheckAuthCodeCommand;

public interface CheckAuthCodeService {

    String checkAuthCode(CheckAuthCodeCommand command);
}
