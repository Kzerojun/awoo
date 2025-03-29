package com.awoo.usedproduct.application.service;

import com.awoo.usedproduct.application.QueryUsedProductsService;
import com.awoo.usedproduct.application.exception.ApplicationErrorCode;
import com.awoo.usedproduct.application.exception.UsedProductNotFoundException;
import com.awoo.usedproduct.application.query.FetchUsedProductQuery;
import com.awoo.usedproduct.domain.LikeRepository;
import com.awoo.usedproduct.domain.Status;
import com.awoo.usedproduct.domain.UsedProductEntity;
import com.awoo.usedproduct.domain.UsedProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class QueryUsedProductsServiceImpl implements QueryUsedProductsService {

    private final UsedProductRepository usedProductRepository;
    private final LikeRepository likeRepository;

    @Override
    public Page<UsedProductEntity> fetchUsedProducts(Pageable pageable) {
        //계약 중, 예약중으로 20개 조회
        return usedProductRepository.findByStatusIn(List.of(Status.SA, Status.RE), pageable);
    }

    @Override
    @Transactional
    public UsedProductEntity fetchUsedProduct(FetchUsedProductQuery query) {
        UsedProductEntity usedProductEntity = usedProductRepository.findById(query.usedProductId())
                .orElseThrow(() -> new UsedProductNotFoundException(
                        ApplicationErrorCode.PRODUCT_NOT_FOUND));
        usedProductEntity.increaseViewCount();
        return usedProductEntity;
    }

    @Override
    public boolean isLiked(Integer usedProductId, Integer memberId) {
        if (memberId == null) {
            return false;
        }
        return likeRepository.existsByUsedProductIdAndMemberId(usedProductId, memberId);
    }
}
