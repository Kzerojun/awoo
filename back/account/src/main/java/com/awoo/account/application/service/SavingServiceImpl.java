package com.awoo.account.application.service;

import com.awoo.account.application.command.CreateSavingAccountCommand;
import com.awoo.account.infra.ssafyfinance.SSAFYSavingsApiClient;
import com.awoo.account.infra.ssafyfinance.request.SSAFYCreateSavingAccountRequest;
import com.awoo.account.support.SSAFYApiHelper;
import com.awoo.account.support.SSAFYCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SavingServiceImpl implements SavingService{

    private final SSAFYApiHelper ssafyApiHelper;
    private final SSAFYSavingsApiClient SSAFYApiClient;
    public void createSavingAccount(String memberId, CreateSavingAccountCommand command) {
        //SSAFY 적금 계좌 생성 요청 생성
        SSAFYCreateSavingAccountRequest request = SSAFYCreateSavingAccountRequest.builder()
                .Header(ssafyApiHelper.createHeader(Integer.valueOf(memberId), SSAFYCode.CREATE_SAVING_ACCOUNT))
                .accountTypeUniqueNo("999-3-d4251cade30541")    //TODO: 현재 Test 적금 상품
                .depositBalance(command.depositBalance())
                .withdrawalAccountNo(command.withdrawalAccountNo())
                .build();

        //SSAFY 적금 계좌 생성 요청 전송
        SSAFYApiClient.createSavingAccount(request);
    }


}
