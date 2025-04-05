package com.awoo.account.ui.controller;

import com.awoo.account.application.command.*;
import com.awoo.account.support.ApiUtils;
import com.awoo.account.ui.facade.AccountServiceFacade;
import com.awoo.account.ui.facade.dto.request.*;
import com.awoo.account.ui.facade.dto.response.DeductBalanceResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/accounts")
@RequiredArgsConstructor
public class AccountController {

    private final AccountServiceFacade accountServiceFacade;
    @PostMapping
    public ApiUtils.ApiResult<?> createAccount(@RequestHeader("X-User-Id") String memberId,
                                               @RequestBody CreateAccountRequest request) {
        try{
            CreateAccountCommand command = request.toCommand();
            return ApiUtils.success(Map.of("accountNo", accountServiceFacade.createAccount(memberId, command)));
        }catch (Exception e){
            return ApiUtils.error(e, HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping
    public ApiUtils.ApiResult<?> getAccountList(@RequestHeader("X-User-Id") String memberId) {
        try{
            return ApiUtils.success(accountServiceFacade.getAccountList(memberId));
        }catch (Exception e){
            return ApiUtils.error(e, HttpStatus.BAD_REQUEST);
        }
    }

    //거래내역 조회
    @PostMapping("/transactions")
    public ApiUtils.ApiResult<?> getTransactions(@RequestHeader("X-User-Id") String memberId,
                                                 @RequestBody TransactionsRequest request) {
        TransactionsCommand command = request.toCommond();
        try{
            return ApiUtils.success(accountServiceFacade.getTransactions(memberId, command));
        }catch (Exception e){
            return ApiUtils.error(e, HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/transfer")
    public ApiUtils.ApiResult<?> transfer(@RequestHeader("X-User-Id") String memberId,
                                          @RequestBody TransferRequest request) {
        try{
            TransferCommand command = request.toCommand();
            return ApiUtils.success(accountServiceFacade.transfer(memberId, command));
        }catch (Exception e){
            return ApiUtils.error(e, HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/deduct")
    public ApiUtils.ApiResult<DeductBalanceResponse> deductBalance(@RequestBody DeductBalanceRequest request) {
        DeductBalanceCommand command = request.toCommand();
        return ApiUtils.success(accountServiceFacade.deductBalance(command));
    }

    @PostMapping("/password")
    public ApiUtils.ApiResult<?> confirmPassword(@RequestBody Map<String, String> request) {
        try{
            if (accountServiceFacade.confirmPassword(request.get("accountNo"), request.get("password"))) {
                return ApiUtils.success("비밀번호 일치");
            }
            return ApiUtils.error("비밀번호가 일치하지 않습니다.", HttpStatus.UNAUTHORIZED);
        }catch (Exception e){
            return ApiUtils.error(e, HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/memo")
    public ApiUtils.ApiResult<?> writeMemo(@RequestHeader("X-User-Id") String memberId,
                                           @RequestBody WriteMemoRequest request) {
        try {
            WriteMemoCommand command = request.toCommand();
            accountServiceFacade.writeMemo(memberId, command);
            return ApiUtils.success("메시지가 등록되었습니다.");
        }catch (Exception e) {
            return ApiUtils.error(e, HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping
    public ApiUtils.ApiResult<?> deleteAccount(@RequestHeader("X-User-Id") String memberId,
                                               @RequestBody DeleteAccountRequest request){
        try{
            DeleteAccountCommand command = request.toCommand();
            accountServiceFacade.deleteAccount(memberId, command);
            return ApiUtils.success("계좌 정보가 삭제되었습니다.");
        }catch (Exception e){
            return ApiUtils.error(e, HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/change-limit")
    public ApiUtils.ApiResult<?> changeLimit(@RequestHeader("X-User-Id") String memberId,
                                             @RequestBody ChangeLimitRequest request) {
        try {
            ChangeLimitCommand command = request.toCommand();
            accountServiceFacade.changeLimit(memberId, command);
            return ApiUtils.success("정상 처리되었습니다.");
        }catch (Exception e) {
            return ApiUtils.error(e, HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/openAccountAuth")
    public ApiUtils.ApiResult<?> openAccountAuth(@RequestHeader("X-User-Id") String memberId,
                                                 @RequestBody Map<String, String> request){
        try {
            accountServiceFacade.openAccountAuth(memberId, request.get("accountNo"));
            return ApiUtils.success("정상 처리되었습니다.");
        }catch (Exception e) {
            return ApiUtils.error(e, HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/checkAuthCode")
    public ApiUtils.ApiResult<?> checkAuthCode(@RequestHeader("X-User-Id") String memberId,
                                                 @RequestBody Map<String, String> request){
        try {
            accountServiceFacade.checkAuthCode(memberId, request.get("accountNo"), request.get("authCode"));
            return ApiUtils.success("정상 처리되었습니다.");
        }catch (Exception e) {
            return ApiUtils.error(e, HttpStatus.BAD_REQUEST);
        }
    }
}
