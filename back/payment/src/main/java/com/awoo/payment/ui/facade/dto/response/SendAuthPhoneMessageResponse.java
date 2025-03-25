package com.awoo.payment.ui.facade.dto.response;

import com.awoo.payment.ui.facade.dto.response.constant.PaymentResponseMessage;

public record SendAuthPhoneMessageResponse(String message) {

    public static SendAuthPhoneMessageResponse create() {
        return new SendAuthPhoneMessageResponse(PaymentResponseMessage.SEND_AUTH_PHONE_MESSAGE_SUCCESS.getMessage());
    }

}
