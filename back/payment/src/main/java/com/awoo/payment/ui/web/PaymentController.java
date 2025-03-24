package com.awoo.payment.ui.web;


import com.awoo.payment.application.command.ChargeBalanceCommand;
import com.awoo.payment.application.command.RegisterPaymentCommand;
import com.awoo.payment.application.query.FetchBalanceQuery;
import com.awoo.payment.support.ApiUtils;
import com.awoo.payment.ui.facade.PaymentServiceFacade;
import com.awoo.payment.ui.facade.dto.request.ChargePaymentBalanceRequest;
import com.awoo.payment.ui.facade.dto.request.RegisterPaymentPasswordRequest;
import com.awoo.payment.ui.facade.dto.response.ChargeBalanceResponse;
import com.awoo.payment.ui.facade.dto.response.FetchBalanceResponse;
import com.awoo.payment.ui.facade.dto.response.RegisterPaymentPasswordResponse;
import com.awoo.payment.ui.facade.dto.response.RegisterPaymentResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/payments")
@RequiredArgsConstructor
public class PaymentController {

    private final PaymentServiceFacade paymentServiceFacade;

    @PostMapping("/register")
    public  ApiUtils.ApiResult<RegisterPaymentResponse> register(@RequestHeader("X-User-Id") Integer memberId) {
        RegisterPaymentCommand command = RegisterPaymentCommand.builder()
                .memberId(memberId)
                .build();
        RegisterPaymentResponse response = paymentServiceFacade.register(command);
        return ApiUtils.success(response);
    }

    @PostMapping("/password")
    public ApiUtils.ApiResult<RegisterPaymentPasswordResponse> registerPassword(@RequestHeader("X-User-Id") Integer memberId,
                                                        @RequestBody RegisterPaymentPasswordRequest request) {
        RegisterPaymentPasswordResponse response = paymentServiceFacade.registerPassword(request.toCommand(memberId));
        return ApiUtils.success(response);
    }

    @GetMapping("/balance")
    public ApiUtils.ApiResult<FetchBalanceResponse> fetchBalance(@RequestHeader("X-User-Id") Integer memberId) {
        FetchBalanceQuery query = FetchBalanceQuery.builder().memberId(memberId).build();
        FetchBalanceResponse response = paymentServiceFacade.fetchBalance(query);
        return ApiUtils.success(response);
    }

    @PostMapping("/charges")
    public ApiUtils.ApiResult<ChargeBalanceResponse> chargeBalance(@RequestHeader("X-User-Id") Integer memberId,
                                                                  @RequestHeader("Idempotency-Key") String idempotencyKey,
                                                                  @RequestBody ChargePaymentBalanceRequest request) {
        ChargeBalanceCommand command = request.toCommand(memberId,idempotencyKey);
        ChargeBalanceResponse response = paymentServiceFacade.chargeBalance(command);
        return ApiUtils.success(response);
    }
}
