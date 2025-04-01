package com.awoo.usedproduct.application.service;

import com.awoo.usedproduct.application.ModifyStatusService;
import com.awoo.usedproduct.application.command.ModifyUsedProductCommand;
import com.awoo.usedproduct.application.command.ModifyUsedProductStatusCommand;
import com.awoo.usedproduct.application.exception.ApplicationErrorCode;
import com.awoo.usedproduct.application.exception.UsedProductNotFoundException;
import com.awoo.usedproduct.domain.UsedProductEntity;
import com.awoo.usedproduct.domain.UsedProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ModifyStatusServiceImpl implements ModifyStatusService {

    private final UsedProductRepository usedProductRepository;

    @Override
    @Transactional
    public Integer modifyStatus(ModifyUsedProductStatusCommand command) {
        UsedProductEntity usedProductEntity = usedProductRepository.findById(command.usedProductId()).orElseThrow(() -> new UsedProductNotFoundException(ApplicationErrorCode.PRODUCT_NOT_FOUND));
        usedProductEntity.modifyStatus(command.status(), command.memberId());
        return usedProductEntity.getUsedProductId();
    }
}
