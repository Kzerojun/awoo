package com.awoo.usedproduct.application.service;

import com.awoo.usedproduct.application.QueryUsedProductsService;
import com.awoo.usedproduct.domain.Status;
import com.awoo.usedproduct.domain.UsedProductEntity;
import com.awoo.usedproduct.domain.UsedProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class QueryUsedProductsServiceImpl implements QueryUsedProductsService {

    private final UsedProductRepository usedProductRepository;

    @Override
    public Page<UsedProductEntity> fetchUsedProducts(Pageable pageable) {
        //계약 중, 예약중으로 20개 조회
        return usedProductRepository.findByStatusIn(List.of(Status.SA, Status.RE), pageable);
    }
}
