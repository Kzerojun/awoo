package com.awoo.usedproduct.ui.facade.dto.response;

import com.awoo.usedproduct.domain.UsedProductStatus;
import com.awoo.usedproduct.domain.UsedProductEntity;
import com.awoo.usedproduct.domain.UsedProductImage;

import java.time.LocalDateTime;
import java.util.List;

public record FetchUsedProductDetailResponse(Integer usedProductId, String title, String content,
											 Integer price, UsedProductStatus usedProductStatus, int viewCount,
											 int likeCount, List<String> imageUrls, boolean isLiked, boolean canModify,String name,
											 Integer sellerId, String memberProfileImage, LocalDateTime createdAt
) {
	public static FetchUsedProductDetailResponse create(UsedProductEntity usedProductEntity, boolean isLiked,String name, Integer memberId,String memberProfileImage){
		return new FetchUsedProductDetailResponse(
				usedProductEntity.getUsedProductId(),
				usedProductEntity.getTitle(),
				usedProductEntity.getContent(),
				usedProductEntity.getPrice(),
				usedProductEntity.getUsedProductStatus(),
				usedProductEntity.getViewCount(),
				usedProductEntity.getLikeCount(),
				usedProductEntity.getImages().stream()
						.map(UsedProductImage::getImageUrl).toList(),
				isLiked,
				usedProductEntity.hasPermission(memberId),
				name,
				usedProductEntity.getMemberId(),
				memberProfileImage,
				usedProductEntity.getCreatedAt()
		);
	}

}
