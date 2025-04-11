package com.awoo.usedproduct.application.service;

import com.awoo.usedproduct.application.RegisterUsedProductService;
import com.awoo.usedproduct.application.command.RegisterUsedProductCommand;
import com.awoo.usedproduct.domain.UsedProductEntity;
import com.awoo.usedproduct.domain.UsedProductFactory;
import com.awoo.usedproduct.domain.UsedProductRepository;
import com.awoo.usedproduct.infra.aws.S3Storage;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class RegisterUsedProductServiceImpl implements RegisterUsedProductService {

    private final UsedProductRepository usedProductRepository;
    private final S3Storage s3Storage;
    private final UsedProductFactory usedProductFactory;

    @Override
    public Integer registerUsedProduct(RegisterUsedProductCommand command) {
        List<String> imageUrls = command.images().stream()
                .map(s3Storage::uploadFile)
                .toList();

        UsedProductEntity usedProductEntity = usedProductFactory.create(command.memberId(),
                command.title(),
                command.content(),
                command.price(),
                imageUrls);
        usedProductRepository.store(usedProductEntity);
        return usedProductEntity.getUsedProductId();
    }
}
