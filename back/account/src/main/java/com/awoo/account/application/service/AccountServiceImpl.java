package com.awoo.account.application.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AccountServiceImpl implements AccountService{

    public void createAccount(String userKey) {
        //kafka send() -> consumer에서 복호화된 userKey를 받을텐데...
        //consumer에서 service 호출을 해야하나 -> controller return은..?

        //여기서 kafka send() 처리하고
        //kafka consumer에서 받아온 응답을 처리할 매서드를 생성?
        //controller는 누구를 호출해야하지?

        //그냥 REST API 호출.


    }
}
