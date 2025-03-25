package com.awoo.account.ui.controller;

import com.awoo.account.application.command.CreateAccountCommand;
import com.awoo.account.application.command.DeductBalanceCommand;
import com.awoo.account.application.command.TransactionsCommand;
import com.awoo.account.support.ApiUtils;
import com.awoo.account.ui.facade.AccountServiceFacade;
import com.awoo.account.ui.facade.dto.request.CreateAccountRequest;
import com.awoo.account.ui.facade.dto.request.DeductBalanceRequest;
import com.awoo.account.ui.facade.dto.request.TransactionsRequest;
import com.awoo.account.ui.facade.dto.response.DeductBalanceResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

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
            accountServiceFacade.createAccount(memberId, command);
            return ApiUtils.success("계좌가 생성되었습니다.");
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
    @GetMapping("/transactions")
    public ApiUtils.ApiResult<?> getTransactions(@RequestHeader("X-User-Id") String memberId,
                                                 @RequestBody TransactionsRequest request) {
        TransactionsCommand command = request.toCommond();
        try{
            return ApiUtils.success(accountServiceFacade.getTransactions(memberId, command));
        }catch (Exception e){
            return ApiUtils.error(e, HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/deduct")
    public ApiUtils.ApiResult<DeductBalanceResponse> deductBalance(@RequestBody DeductBalanceRequest request) {
        DeductBalanceCommand command = request.toCommand();
        return ApiUtils.success(accountServiceFacade.deductBalance(command));
    }
}
