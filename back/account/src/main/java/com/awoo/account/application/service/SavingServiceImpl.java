package com.awoo.account.application.service;

import com.awoo.account.application.command.CreateSavingAccountCommand;
import com.awoo.account.infra.ssafyfinance.SSAFYSavingsApiClient;
import com.awoo.account.infra.ssafyfinance.request.SSAFYCHANRequest;
import com.awoo.account.infra.ssafyfinance.request.SSAFYCommonHeaderRequest;
import com.awoo.account.infra.ssafyfinance.request.SSAFYCreateSavingAccountRequest;
import com.awoo.account.support.SSAFYApiHelper;
import com.awoo.account.support.SSAFYCode;
import com.awoo.account.ui.facade.dto.response.EarlyInterestPayResponse;
import com.awoo.account.ui.facade.dto.response.InquireSavingPaymentResponse;
import com.awoo.account.ui.facade.dto.response.InterestPayResponse;
import com.awoo.account.ui.facade.dto.response.SavingAccountResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SavingServiceImpl implements SavingService{

    private final SSAFYApiHelper ssafyApiHelper;
    private final SSAFYSavingsApiClient SSAFYApiClient;
    public void createSavingAccount(String memberId, CreateSavingAccountCommand command) {
        //SSAFY 적금 계좌 생성 요청 생성
        SSAFYCreateSavingAccountRequest request = SSAFYCreateSavingAccountRequest.builder()
                .Header(ssafyApiHelper.createHeader(Integer.valueOf(memberId), SSAFYCode.CREATE_SAVING_ACCOUNT))
                .accountTypeUniqueNo(command.accountTypeUniqueNo())
                .depositBalance(command.depositBalance())
                .withdrawalAccountNo(command.withdrawalAccountNo())
                .build();

        //SSAFY 적금 계좌 생성 요청 전송
        SSAFYApiClient.createSavingAccount(request);
    }

    public List<SavingAccountResponse> getSavingAccountList(String memberId) {
        //SSAFY 적금 계좌 목록 요청 생성
        SSAFYCommonHeaderRequest request = SSAFYCommonHeaderRequest.builder()
                .Header(ssafyApiHelper.createHeader(Integer.valueOf(memberId), SSAFYCode.SAVING_ACCOUNT_LIST))
                .build();

        return SSAFYApiClient.getSavingAccountList(request).REC().list();
    }

    public InterestPayResponse getInterestPay(String memberId, String accountNo) {
        //SSAFY 적금 만기 해지 이자 요청 생성
        SSAFYCHANRequest request = SSAFYCHANRequest.builder()
                .Header(ssafyApiHelper.createHeader(Integer.valueOf(memberId), SSAFYCode.INTEREST_PAYMENT))
                .accountNo(accountNo)
                .build();

        return SSAFYApiClient.getInterestPay(request).REC();
    }

    public EarlyInterestPayResponse getEarlyInterestPay(String memberId, String accountNo) {
        //SSAFY 적금 중도 해지 이자 요청 생성
        SSAFYCHANRequest request = SSAFYCHANRequest.builder()
                .Header(ssafyApiHelper.createHeader(Integer.valueOf(memberId), SSAFYCode.EARLY_INTEREST_PAYMENT))
                .accountNo(accountNo)
                .build();

        return SSAFYApiClient.getEarlyInterestPay(request).REC();
    }

    public void deleteSavingAccount(String memberId, String accountNo) {
        //SSAFY 적금 중도 해지 이자 요청 생성
        SSAFYCHANRequest request = SSAFYCHANRequest.builder()
                .Header(ssafyApiHelper.createHeader(Integer.valueOf(memberId), SSAFYCode.DELETE_SAVING_ACCOUNT))
                .accountNo(accountNo)
                .build();

        SSAFYApiClient.deleteSavingAccount(request);
    }

    public InquireSavingPaymentResponse InquireSavingPaymentResponse(String memberId, String accountNo) {
        //SSAFY 적금 납입 회차 조회 요청 생성
        SSAFYCHANRequest request = SSAFYCHANRequest.builder()
                .Header(ssafyApiHelper.createHeader(Integer.valueOf(memberId), SSAFYCode.INQUIRE_SAVING_PAYMENT))
                .accountNo(accountNo)
                .build();

        return SSAFYApiClient.InquireSavingPaymentResponse(request).REC().get(0);
    }


}
