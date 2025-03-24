package com.awoo.account.ui.controller;

import com.awoo.account.application.command.DeductBalanceCommand;
import com.awoo.account.support.ApiUtils;
import com.awoo.account.ui.facade.AccountServiceFacade;
import com.awoo.account.ui.facade.dto.request.DeductBalanceRequest;
import com.awoo.account.ui.facade.dto.response.DeductBalanceResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/accounts")
@RequiredArgsConstructor
public class AccountController {

    private final AccountServiceFacade accountServiceFacade;

    @PostMapping
    public ResponseEntity<?> createAccount(@RequestBody String userKey) {
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PostMapping("/deduct")
    public ApiUtils.ApiResult<DeductBalanceResponse> deductBalance(@RequestBody DeductBalanceRequest request) {
        DeductBalanceCommand command = request.toCommand();
        return ApiUtils.success(accountServiceFacade.deductBalance(command));
    }
}
