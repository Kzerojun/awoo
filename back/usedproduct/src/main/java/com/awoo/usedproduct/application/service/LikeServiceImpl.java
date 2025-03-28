package com.awoo.usedproduct.application.service;

import com.awoo.usedproduct.application.LikeService;
import com.awoo.usedproduct.application.command.LikeCommand;
import com.awoo.usedproduct.application.exception.ApplicationErrorCode;
import com.awoo.usedproduct.application.exception.UsedProductNotFoundException;
import com.awoo.usedproduct.domain.LikeEntity;
import com.awoo.usedproduct.domain.LikeRepository;
import com.awoo.usedproduct.domain.UsedProductEntity;
import com.awoo.usedproduct.domain.UsedProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class LikeServiceImpl implements LikeService {

    private final UsedProductRepository usedProductRepository;
    private final LikeRepository likeRepository;

    @Transactional
    @Override
    public boolean like(LikeCommand command) {
        UsedProductEntity usedProduct = findUsedProduct(command.usedProductId());
        Optional<LikeEntity> existingLike = likeRepository.findByMemberIdAndUsedProductId(command.memberId(), command.usedProductId());

        //이미 좋아요가 눌린상태이면 좋아요 취소
        if (existingLike.isPresent()) {
            removeLike(existingLike.get(), usedProduct);
            return true;
        } else {
            addLike(command, usedProduct);
            return false;
        }
    }

    private UsedProductEntity findUsedProduct(Integer usedProductId) {
        return usedProductRepository.findById(usedProductId)
                .orElseThrow(() -> new UsedProductNotFoundException(ApplicationErrorCode.PRODUCT_NOT_FOUND));
    }

    private void removeLike(LikeEntity like, UsedProductEntity usedProduct) {
        likeRepository.delete(like);
        usedProduct.decreaseLikeCount();
    }

    private void addLike(LikeCommand command, UsedProductEntity usedProduct) {
        LikeEntity newLike = LikeEntity.builder()
                .memberId(command.memberId())
                .usedProductId(command.usedProductId())
                .build();
        likeRepository.save(newLike);
        usedProduct.increaseLikeCount();
    }
}
