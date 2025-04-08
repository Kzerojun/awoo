package com.awoo.alarm.application.impl;

import com.awoo.alarm.application.SendAlarmService;
import com.awoo.alarm.application.command.FcmSendCommand;
import com.awoo.alarm.application.exception.AlarmRegisterException;
import com.awoo.alarm.application.exception.FcmAccessTokenNotFoundException;
import com.awoo.alarm.application.exception.MessageRequiredException;
import com.awoo.alarm.domain.Alarm;
import com.awoo.alarm.domain.AlarmFactory;
import com.awoo.alarm.domain.AlarmRepository;
import com.awoo.alarm.ui.facade.dto.response.FcmMessageDto;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.auth.oauth2.GoogleCredentials;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.*;
import org.springframework.http.converter.StringHttpMessageConverter;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SendAlarmServiceImpl implements SendAlarmService {

    private final AlarmFactory alarmFactory;
    private final AlarmRepository alarmRepository;

    @Override
    public Alarm sendAlarmTo(FcmSendCommand fcmSendCommand) {

        String message = null;
        try {
            message = makeMessage(fcmSendCommand);
        } catch (JsonProcessingException e) {
            throw new MessageRequiredException();
        }

        RestTemplate restTemplate = new RestTemplate();
        restTemplate.getMessageConverters()
                .add(0, new StringHttpMessageConverter(StandardCharsets.UTF_8));

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        try{
            headers.set("Authorization", "Bearer " + getAccessToken());
        }catch (Exception e){
            throw new FcmAccessTokenNotFoundException();
        }


        HttpEntity entity = new HttpEntity<>(message, headers);

        String API_URL = "https://fcm.googleapis.com/v1/projects/awoo-2c8de/messages:send";
        ResponseEntity response = restTemplate.exchange(API_URL, HttpMethod.POST, entity, String.class);


        System.out.println(response.getStatusCode());

        String statusCode = response.getStatusCode() == HttpStatus.OK ? "Y" : "N";

        Alarm alarm = alarmFactory.registerAlarmEntity(fcmSendCommand, statusCode, 1, 1);

        try{
            alarmRepository.saveAlarm(alarm);
        }catch (Exception e){
            throw new AlarmRegisterException();
        }

        return alarm;
    }

    /**
     * Firebase Admin SDK의 비공개 키를 참조하여 Bearer 토큰을 발급 받습니다.
     *
     * @return Bearer token
     */
    private String getAccessToken() throws IOException {
        String firebaseConfigPath = "firebase/awoo-2c8de-firebase-adminsdk-fbsvc-8bea6d6321.json";

        ClassPathResource resource = new ClassPathResource(firebaseConfigPath);
        if (!resource.exists()) {
            throw new RuntimeException("⚠️ Firebase JSON 파일을 찾을 수 없습니다: " + firebaseConfigPath);
        }

        GoogleCredentials googleCredentials = GoogleCredentials
                .fromStream(resource.getInputStream())
                .createScoped(List.of("https://www.googleapis.com/auth/firebase.messaging"));
        googleCredentials.refreshIfExpired();
        return googleCredentials.getAccessToken().getTokenValue();
    }

    private String makeMessage(FcmSendCommand fcmSendCommand) throws JsonProcessingException {

        ObjectMapper om = new ObjectMapper();
        FcmMessageDto fcmMessageDto = FcmMessageDto.builder()
                .message(FcmMessageDto.Message.builder()
                        .token(fcmSendCommand.token())
                        .notification(FcmMessageDto.Notification.builder()
                                .title(fcmSendCommand.title())
                                .body(fcmSendCommand.body())
                                .image(null)
                                .build()
                        )
                        .webpush(FcmMessageDto.Webpush.builder()
                                .fcm_options(FcmMessageDto.FcmOptions.builder()
                                        .link("https://awoofinance.duckdns.org/")
                                        .build())
                                .build())
                        .build()).validateOnly(false).build();

        return om.writeValueAsString(fcmMessageDto);
    }
}
