package com.awoo.usedproduct.application.service;

import com.awoo.usedproduct.application.ModifyUsedProductService;
import com.awoo.usedproduct.application.command.ModifyUsedProductCommand;
import com.awoo.usedproduct.application.exception.ApplicationErrorCode;
import com.awoo.usedproduct.application.exception.UsedProductNotFoundException;
import com.awoo.usedproduct.domain.UsedProductEntity;
import com.awoo.usedproduct.domain.UsedProductImage;
import com.awoo.usedproduct.domain.UsedProductRepository;
import com.awoo.usedproduct.infra.aws.S3Storage;
import java.util.ArrayList;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Slf4j
public class ModifyUsedProductServiceImpl implements ModifyUsedProductService {

    private final S3Storage s3Storage;
    private final UsedProductRepository usedProductRepository;
    @Override
    @Transactional
    public Integer modifyUsedProduct(ModifyUsedProductCommand command) {
        UsedProductEntity usedProductEntity = usedProductRepository.findById(command.usedProductId())
                .orElseThrow(() -> new UsedProductNotFoundException(ApplicationErrorCode.PRODUCT_NOT_FOUND));

        if (usedProductEntity.canModify(command.memberId())) {

            // 새 이미지 업로드
            List<UsedProductImage> newImageEntities = command.newImages().stream()
                    .map(s3Storage::uploadFile)
                    .map(UsedProductImage::new)
                    .toList();

            // 남겨둘 기존 이미지 객체로 변환
            List<UsedProductImage> remainImageEntities = command.remainImages().stream()
                    .map(UsedProductImage::new)
                    .toList();

            // 최종 이미지 목록 구성
            List<UsedProductImage> finalImageEntities = new ArrayList<>();
            finalImageEntities.addAll(remainImageEntities);
            finalImageEntities.addAll(newImageEntities);

            // 게시글 수정
            usedProductEntity.modify(
                    command.title(),
                    command.content(),
                    command.price(),
                    finalImageEntities
            );
        }
        return usedProductEntity.getUsedProductId();
    }
}
