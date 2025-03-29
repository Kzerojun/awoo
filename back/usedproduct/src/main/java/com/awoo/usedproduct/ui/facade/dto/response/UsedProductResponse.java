package com.awoo.usedproduct.ui.facade.dto.response;

import com.awoo.usedproduct.domain.Status;
import com.awoo.usedproduct.domain.UsedProductEntity;

public record UsedProductResponse(Integer productId, String title, String content, Integer price, Status status, int viewCount, int likeCount, String imageUrl) {

    public static UsedProductResponse fromEntity(UsedProductEntity entity) {
        String firstImageUrl = extractFirstImageUrl(entity);

        return new UsedProductResponse(
                entity.getUsedProductId(),
                entity.getTitle(),
                entity.getContent(),
                entity.getPrice(),
                entity.getStatus(),
                entity.getViewCount(),
                entity.getLikeCount(),
                firstImageUrl
        );
    }

    private static String extractFirstImageUrl(UsedProductEntity entity) {
        return entity.getImages() != null && !entity.getImages().isEmpty()
                ? entity.getImages().get(0).getImageUrl()
                : null;
    }
}
