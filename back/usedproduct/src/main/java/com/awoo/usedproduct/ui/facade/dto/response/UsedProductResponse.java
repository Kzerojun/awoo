package com.awoo.usedproduct.ui.facade.dto.response;

import com.awoo.usedproduct.domain.UsedProductStatus;
import com.awoo.usedproduct.domain.UsedProductEntity;
import java.time.LocalDateTime;

public record UsedProductResponse(Integer productId, String title, String content, Integer price, UsedProductStatus usedProductStatus, int viewCount, int likeCount, String imageUrl, LocalDateTime createdAt) {

    public static UsedProductResponse fromEntity(UsedProductEntity entity) {
        String firstImageUrl = extractFirstImageUrl(entity);

        return new UsedProductResponse(
                entity.getUsedProductId(),
                entity.getTitle(),
                entity.getContent(),
                entity.getPrice(),
                entity.getUsedProductStatus(),
                entity.getViewCount(),
                entity.getLikeCount(),
                firstImageUrl,
                entity.getCreatedAt()
        );
    }

    private static String extractFirstImageUrl(UsedProductEntity entity) {
        return entity.getImages() != null && !entity.getImages().isEmpty()
                ? entity.getImages().get(0).getImageUrl()
                : null;
    }
}
