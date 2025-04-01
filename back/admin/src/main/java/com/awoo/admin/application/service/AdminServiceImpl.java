package com.awoo.admin.application.service;

import com.awoo.admin.application.command.CreateAdminAccountCommand;
import com.awoo.admin.application.command.CreateSavingProductCommand;
import com.awoo.admin.application.command.LoginAdminCommand;
import com.awoo.admin.domain.Entity.AdminEntity;
import com.awoo.admin.domain.Role;
import com.awoo.admin.domain.repository.AdminRepository;
import com.awoo.admin.infra.ssafyfinance.SSAFYSavingsApiClient;
import com.awoo.admin.infra.ssafyfinance.request.SSAFYCommonHeaderRequest;
import com.awoo.admin.infra.ssafyfinance.request.SSAFYCreateSavingProductRequest;
import com.awoo.admin.support.AESUtil;
import com.awoo.admin.support.SSAFYApiHelper;
import com.awoo.admin.support.SSAFYCode;
import com.awoo.admin.ui.facade.dto.response.SavingsProductResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService{

    private final SSAFYApiHelper ssafyApiHelper;
    private final SSAFYSavingsApiClient ssafySavingsApiClient;
    private final AdminRepository adminRepository;
    private final AESUtil aesUtil;

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

    public void createAdminAccount(CreateAdminAccountCommand command) {
        AdminEntity adminEntity = AdminEntity.builder()
                .adminId(command.adminId())
                .adminPassword(aesUtil.encrypt(command.adminPassword()))
                .role(command.role())
                .build();

        adminRepository.save(adminEntity);
    }

    public Role loginAdmin(LoginAdminCommand command) {
        AdminEntity adminEntity = adminRepository.findByAdminId(command.adminId());
        if (aesUtil.decrypt(adminEntity.getAdminPassword()).equals(command.adminPassword())) {
            return adminEntity.getRole();
        }
        return null;
    }


}
