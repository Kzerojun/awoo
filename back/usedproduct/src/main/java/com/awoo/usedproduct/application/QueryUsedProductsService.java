package com.awoo.usedproduct.application;

import com.awoo.usedproduct.application.query.FetchUsedProductQuery;
import com.awoo.usedproduct.domain.UsedProductEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface QueryUsedProductsService {

    Page<UsedProductEntity> fetchUsedProducts(Pageable pageable);

    UsedProductEntity fetchUsedProduct(FetchUsedProductQuery query);

    boolean isLiked(Integer usedProductId, Integer memberId);
}
