package com.awoo.account.ui.controller;

import com.awoo.account.application.command.CreateSavingAccountCommand;
import com.awoo.account.support.ApiUtils;
import com.awoo.account.ui.facade.SavingServiceFacade;
import com.awoo.account.ui.facade.dto.request.CreateSavingAccount;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/savings")
@RequiredArgsConstructor
public class SavingController {

    private final SavingServiceFacade savingServiceFacade;

    @PostMapping
    public ApiUtils.ApiResult<?> createSavingAccount(@RequestHeader("X-User-Id") String memberId,
            @RequestBody CreateSavingAccount request) {
        try {
            CreateSavingAccountCommand command = request.toCommand();
            savingServiceFacade.createSavingAccount(memberId, command);
            return ApiUtils.success("적금 계좌가 생성되었습니다.");
        }catch (Exception e) {
            return ApiUtils.error(e, HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping
    public ApiUtils.ApiResult<?> getSavingAccount(@RequestHeader("X-User-Id") String memberId,
                                                  @RequestParam(required = false) Integer savingId) {

        try {
            if (savingId == null) {
                return ApiUtils.success(savingServiceFacade.getSavingAccountList(memberId));
            }
            return ApiUtils.success(savingServiceFacade.getSavingAccount(memberId, savingId));
        }catch (Exception e) {
            return ApiUtils.error(e, HttpStatus.BAD_REQUEST);
        }

    }

    @PostMapping("/termination")
    public ApiUtils.ApiResult<?> getInterestPay(@RequestHeader("X-User-Id") String memberId,
                                                         @RequestBody Map<String, String> map) {
        String accountNo = map.get("accountNo");
        try{
            return ApiUtils.success(savingServiceFacade.getInterestPay(memberId, accountNo));
        }catch(Exception e) {
            return ApiUtils.error(e, HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/termination-early")
    public ApiUtils.ApiResult<?> getEarlyInterestPay(@RequestHeader("X-User-Id") String memberId,
                                                @RequestBody Map<String, String> map) {
        String accountNo = map.get("accountNo");
        try{
            return ApiUtils.success(savingServiceFacade.getEarlyInterestPay(memberId, accountNo));
        }catch(Exception e) {
            return ApiUtils.error(e, HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping
    public ApiUtils.ApiResult<?> deleteSavingAccount(@RequestHeader("X-User-Id") String memberId,
                                                @RequestBody Map<String, String> map) {
        String accountNo = map.get("accountNo");
        try{
            savingServiceFacade.deleteSavingAccount(memberId, accountNo);
            return ApiUtils.success("적금 계좌가 삭제되었습니다.");
        }catch(Exception e) {
            return ApiUtils.error(e, HttpStatus.BAD_REQUEST);
        }
    }

    //적급 납입 회차 조회
    @PostMapping("/inquirePayment")
    public ApiUtils.ApiResult<?> inquireSavingPayment(@RequestHeader("X-User-Id") String memberId,
                                                @RequestBody Map<String, String> map) {
        String accountNo = map.get("accountNo");
        try{
            return ApiUtils.success(savingServiceFacade.inquireSavingPayment(memberId, accountNo));
        }catch(Exception e) {
            return ApiUtils.error(e, HttpStatus.BAD_REQUEST);
        }
    }

}
