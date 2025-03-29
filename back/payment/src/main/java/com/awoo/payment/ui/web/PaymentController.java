package com.awoo.payment.ui.web;


import com.awoo.payment.application.command.ChargeBalanceCommand;
import com.awoo.payment.application.command.CheckAuthCodeCommand;
import com.awoo.payment.application.command.VerifyPaymentPasswordCommand;
import com.awoo.payment.application.command.RegisterPaymentCommand;
import com.awoo.payment.application.command.RemitOneWonCommand;
import com.awoo.payment.application.command.SendAuthPhoneMessageCommand;
import com.awoo.payment.application.command.VerifyOneWonCommand;
import com.awoo.payment.application.query.FetchBalanceQuery;
import com.awoo.payment.support.ApiUtils;
import com.awoo.payment.ui.facade.PaymentServiceFacade;
import com.awoo.payment.ui.facade.dto.request.ChargePaymentBalanceRequest;
import com.awoo.payment.ui.facade.dto.request.CheckAuthCodeRequest;
import com.awoo.payment.ui.facade.dto.request.CheckPaymentPasswordRequest;
import com.awoo.payment.ui.facade.dto.request.RegisterPaymentPasswordRequest;
import com.awoo.payment.ui.facade.dto.request.RegisterPaymentRequest;
import com.awoo.payment.ui.facade.dto.request.RemitOneWonRequest;
import com.awoo.payment.ui.facade.dto.request.SendAuthPhoneMessageRequest;
import com.awoo.payment.ui.facade.dto.request.VerifyOneWonRequest;
import com.awoo.payment.ui.facade.dto.response.*;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/payments")
@RequiredArgsConstructor
public class PaymentController {

    private final PaymentServiceFacade paymentServiceFacade;

    @PostMapping("/register")
    public ApiUtils.ApiResult<RegisterPaymentResponse> register(
            @RequestHeader("X-User-Id") String memberId,
            @RequestHeader("auth-token") String authToken,
            @RequestBody RegisterPaymentRequest request) {
        RegisterPaymentCommand command = request.toCommand(authToken, memberId);
        RegisterPaymentResponse response = paymentServiceFacade.register(command);
        return ApiUtils.success(response);
    }

    @PostMapping("/password")
    public ApiUtils.ApiResult<RegisterPaymentPasswordResponse> registerPassword(
            @RequestHeader("X-User-Id") Integer memberId,
            @RequestBody RegisterPaymentPasswordRequest request) {
        RegisterPaymentPasswordResponse response = paymentServiceFacade.registerPassword(
                request.toCommand(memberId));
        return ApiUtils.success(response);
    }

    @GetMapping("/balance")
    public ApiUtils.ApiResult<FetchBalanceResponse> fetchBalance(
            @RequestHeader("X-User-Id") Integer memberId) {
        FetchBalanceQuery query = FetchBalanceQuery.builder().memberId(memberId).build();
        FetchBalanceResponse response = paymentServiceFacade.fetchBalance(query);
        return ApiUtils.success(response);
    }

    @PostMapping("/charges")
    public ApiUtils.ApiResult<ChargeBalanceResponse> chargeBalance(
            @RequestHeader("X-User-Id") String userId,
            @RequestHeader("Idempotency-Key") String idempotencyKey,
            @RequestBody ChargePaymentBalanceRequest request) {
        ChargeBalanceCommand command = request.toCommand(Integer.valueOf(userId), idempotencyKey);
        ChargeBalanceResponse response = paymentServiceFacade.chargeBalance(command);
        return ApiUtils.success(response);
    }

    @PostMapping("/auth/phone-send")
    public ApiUtils.ApiResult<SendAuthPhoneMessageResponse> sendAuthPhoneMessage(
            @RequestBody SendAuthPhoneMessageRequest request,
            @RequestHeader("X-User-Id") String userId) {
        SendAuthPhoneMessageCommand command = request.toCommand(userId);
        SendAuthPhoneMessageResponse response = paymentServiceFacade.sendAuthPhoneMessage(command);
        return ApiUtils.success(response);
    }

    @PostMapping("/auth/phone-verifications")
    public ApiUtils.ApiResult<CheckAuthCodeResponse> checkAuthCode(
            @RequestBody CheckAuthCodeRequest request,
            @RequestHeader("X-User-Id") String userId) {
        CheckAuthCodeCommand command = request.toCommand(userId);
        CheckAuthCodeResponse response = paymentServiceFacade.checkAuthCode(command);
        return ApiUtils.success(response);
    }

    @PostMapping("/one-won")
    public ApiUtils.ApiResult<RemitOneWonResponse> remitOneWon(
            @RequestBody RemitOneWonRequest request,
            @RequestHeader("X-User-Id") String userId) {
        RemitOneWonCommand command = request.toCommand(userId);
        RemitOneWonResponse response = paymentServiceFacade.remitOneWon(command);
        return ApiUtils.success(response);
    }

    @PostMapping("/one-won/verifications")
    public ApiUtils.ApiResult<VerifyOneWonResponse> verifyOneWon(@RequestBody VerifyOneWonRequest request,
            @RequestHeader("X-User-Id") String userId) {

        VerifyOneWonCommand command = request.toCommand(userId);
        VerifyOneWonResponse response = paymentServiceFacade.verifyOneWon(command);
        return ApiUtils.success(response);
    }

    @PostMapping("/auth/password-verifications")
    public ApiUtils.ApiResult<VerifyPaymentPasswordResponse> verifyPaymentPassword(
            @RequestBody CheckPaymentPasswordRequest request,
            @RequestHeader("X-User-Id") String userId) {

        VerifyPaymentPasswordCommand command = request.toCommand(userId);
        VerifyPaymentPasswordResponse response = paymentServiceFacade.verifyPassword(
                command);
        return ApiUtils.success(response);
    }

    @GetMapping("/accounts")
    public ApiUtils.ApiResult<FetchPaymentResponse> fetchAccount(
            @RequestHeader("X-User-Id") String userId) {
        FetchPaymentResponse response = paymentServiceFacade.fetchAccount(
                Integer.valueOf(userId));
        return ApiUtils.success(response);
    }
}
