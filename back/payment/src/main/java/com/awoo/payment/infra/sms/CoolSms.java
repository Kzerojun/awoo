package com.awoo.payment.infra.sms;

import lombok.extern.slf4j.Slf4j;
import net.nurigo.sdk.NurigoApp;
import net.nurigo.sdk.message.exception.NurigoMessageNotReceivedException;
import net.nurigo.sdk.message.model.Message;
import net.nurigo.sdk.message.service.DefaultMessageService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class CoolSms {

    @Value("${sms.cool.sms-key}")
    private String COOL_SMS_KEY;

    @Value("${sms.cool.sms-scret-key}")
    private String COOL_SMS_SECRET_KEY;

    public void sendMessage(String fromPhoneNumber,String toPhoneNUmber ,String authCode) {
        DefaultMessageService messageService =  NurigoApp.INSTANCE.initialize(COOL_SMS_KEY, COOL_SMS_SECRET_KEY, "https://api.coolsms.co.kr");
        Message message = new Message();
        message.setFrom(fromPhoneNumber);
        message.setTo(toPhoneNUmber);

        String text = "[AWOO] 인증코드 : " +authCode;
        message.setText(text);

        try {
            messageService.send(message);
        } catch (NurigoMessageNotReceivedException exception) {
            log.error(exception.getFailedMessageList().toString());
            log.error(exception.getMessage());
        } catch (Exception exception) {
            log.error(exception.getMessage());
        }
    }

}
