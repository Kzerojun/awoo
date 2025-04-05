package com.awoo.admin.application.service;

import com.awoo.admin.application.command.CreateSavingProductCommand;
import com.awoo.admin.infra.ssafyfinance.SSAFYSavingsApiClient;
import com.awoo.admin.infra.ssafyfinance.request.SSAFYCommonHeaderRequest;
import com.awoo.admin.infra.ssafyfinance.request.SSAFYCreateSavingProductRequest;
import com.awoo.admin.support.SSAFYApiHelper;
import com.awoo.admin.support.SSAFYCode;
import com.awoo.admin.ui.facade.dto.response.SavingsProductResponse;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class SavingServiceImpl implements SavingService{
    private final SSAFYApiHelper ssafyApiHelper;
    private final SSAFYSavingsApiClient ssafySavingsApiClient;
    public void createSavingProduct(CreateSavingProductCommand command) {
        SSAFYCreateSavingProductRequest request = SSAFYCreateSavingProductRequest.builder()
                .Header(ssafyApiHelper.createHeader(SSAFYCode.CREATE_SAVING_PRODUCT))
                .bankCode(command.bankCode())
                .accountName(command.accountName())
                .accountDescription(command.accountDescription())
                .subscriptionPeriod(command.subscriptionPeriod())
                .minSubscriptionBalance(command.minSubscriptionBalance())
                .maxSubscriptionBalance(command.maxSubscriptionBalance())
                .interestRate(command.interestRate())
                .rateDescription(command.rateDescription())
                .build();

        ssafySavingsApiClient.createSavingProduct(request);
    }

    public List<SavingsProductResponse> getSavingsProduct() {
        SSAFYCommonHeaderRequest request = SSAFYCommonHeaderRequest.builder()
                .Header(ssafyApiHelper.createHeader(SSAFYCode.INQUIRE_SAVING_PRODUCT))
                .build();

        return ssafySavingsApiClient.getSavingsProduct(request).REC();
    }
}
