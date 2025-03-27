package com.awoo.account.ui.controller;

import com.awoo.account.application.command.CreateSavingAccountCommand;
import com.awoo.account.support.ApiUtils;
import com.awoo.account.ui.facade.SavingServiceFacade;
import com.awoo.account.ui.facade.dto.request.CreateSavingAccount;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

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



}
