package com.awoo.payment.ui.web;


import com.awoo.payment.application.command.RegisterPaymentCommand;
import com.awoo.payment.support.ApiUtils;
import com.awoo.payment.ui.facade.PaymentServiceFacade;
import com.awoo.payment.ui.facade.dto.request.RegisterPaymentRequest;
import com.awoo.payment.ui.facade.dto.response.RegisterPaymentResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/payments")
@RequiredArgsConstructor
public class PaymentController {

    private final PaymentServiceFacade paymentServiceFacade;

    @PostMapping
    public  ApiUtils.ApiResult<RegisterPaymentResponse> register(@RequestBody RegisterPaymentRequest request,
                                                                 @RequestHeader("X-User-Id") Integer memberId) {
        RegisterPaymentCommand command = RegisterPaymentCommand.builder()
                .memberId(memberId)
                .password(request.password())
                .build();

        RegisterPaymentResponse response = paymentServiceFacade.register(command);
        return ApiUtils.success(response);
    }
}
