package com.awoo.usedproduct.application.service;

import com.awoo.usedproduct.application.ModifyUsedProductService;
import com.awoo.usedproduct.application.command.ModifyUsedProductCommand;
import com.awoo.usedproduct.application.exception.ApplicationErrorCode;
import com.awoo.usedproduct.application.exception.UsedProductNotFoundException;
import com.awoo.usedproduct.domain.UsedProductEntity;
import com.awoo.usedproduct.domain.UsedProductRepository;
import com.awoo.usedproduct.infra.aws.S3Storage;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ModifyUsedProductServiceImpl implements ModifyUsedProductService {

    private final S3Storage s3Storage;
    private final UsedProductRepository usedProductRepository;

    @Override
    public Integer modifyUsedProduct(ModifyUsedProductCommand command) {
        UsedProductEntity usedProductEntity = usedProductRepository.findById(command.usedProductId()).orElseThrow(() -> new UsedProductNotFoundException(ApplicationErrorCode.PRODUCT_NOT_FOUND));

        if (usedProductEntity.canModify(command.memberId())) {
            List<String> imageUrls = command.images().stream()
                    .map(s3Storage::uploadFile)
                    .toList();
            usedProductEntity.modify(command.title(), command.content(), command.price(), imageUrls);
        }

        return usedProductEntity.getUsedProductId();
    }
}
