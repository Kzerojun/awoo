package com.awoo.alarm.ui.web;

import com.awoo.alarm.support.ApiUtils;
import com.awoo.alarm.ui.facade.AlarmServiceFacade;
import com.awoo.alarm.ui.facade.dto.request.FcmSendDto;
import com.awoo.alarm.ui.facade.dto.response.SendAlarmResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/alarms")
@RequiredArgsConstructor
public class AlarmController {

    private final AlarmServiceFacade alarmServiceFacade;

    @PostMapping
    public ApiUtils.ApiResult<SendAlarmResponse> sendAlarm(@RequestHeader("X-User-Id") Integer memberId,
                                                           @RequestBody FcmSendDto fcmSendDto){
        return ApiUtils.success(alarmServiceFacade.sendAlarm(fcmSendDto));
    }
}
