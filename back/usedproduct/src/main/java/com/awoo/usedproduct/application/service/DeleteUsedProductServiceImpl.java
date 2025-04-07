package com.awoo.usedproduct.application.service;

import com.awoo.usedproduct.application.DeleteUsedProductService;
import com.awoo.usedproduct.application.command.DeleteUsedProductCommand;
import com.awoo.usedproduct.application.exception.ApplicationErrorCode;
import com.awoo.usedproduct.application.exception.UsedProductNotFoundException;
import com.awoo.usedproduct.domain.UsedProductEntity;
import com.awoo.usedproduct.domain.UsedProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DeleteUsedProductServiceImpl implements DeleteUsedProductService {

    private final UsedProductRepository usedProductRepository;

    @Override
    public void deleteUsedProduct(DeleteUsedProductCommand command) {
        UsedProductEntity usedProductEntity = usedProductRepository.findById(command.userProductId()).orElseThrow(() -> new UsedProductNotFoundException(ApplicationErrorCode.PRODUCT_NOT_FOUND));
        usedProductEntity.canModify(command.memberId());
        usedProductRepository.delete(usedProductEntity);
    }

    @Override
    public void deleteUsedProductByAdmin(Integer usedProductId){
        usedProductRepository.deleteById(usedProductId);
    }
}
