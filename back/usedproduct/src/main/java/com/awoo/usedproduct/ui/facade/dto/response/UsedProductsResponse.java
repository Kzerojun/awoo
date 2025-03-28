package com.awoo.usedproduct.ui.facade.dto.response;

import com.awoo.usedproduct.domain.UsedProductEntity;
import org.springframework.data.domain.Page;

import java.util.List;

public record UsedProductsResponse(
        List<UsedProductResponse> usedProducts,
        int currentPage,
        int totalPages,
        long totalItems,
        int pageSize
) {
    public static UsedProductsResponse fromPage(Page<UsedProductEntity> productsPage) {
        List<UsedProductResponse> productResponses = productsPage.getContent().stream()
                .map(UsedProductResponse::fromEntity)
                .toList();

        return new UsedProductsResponse(
                productResponses,
                productsPage.getNumber(),        // 현재 페이지 번호 (0부터 시작)
                productsPage.getTotalPages(),    // 총 페이지 수
                productsPage.getTotalElements(), // 총 항목 수
                productsPage.getSize()           // 페이지당 항목 수
        );
    }
}