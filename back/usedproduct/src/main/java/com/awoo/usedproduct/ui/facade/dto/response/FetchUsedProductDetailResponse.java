package com.awoo.usedproduct.ui.facade.dto.response;

import com.awoo.usedproduct.domain.Status;
import com.awoo.usedproduct.domain.UsedProductEntity;
import com.awoo.usedproduct.domain.UsedProductImage;
import java.util.List;

public record FetchUsedProductDetailResponse(Integer usedProductId, String title, String content,
											 Integer price, Status status, int viewCount,
											 int likeCount, List<String> imageUrls, boolean isLiked
) {
	public static FetchUsedProductDetailResponse create(UsedProductEntity usedProductEntity, boolean isLiked){
		return new FetchUsedProductDetailResponse(
				usedProductEntity.getUsedProductId(),
				usedProductEntity.getTitle(),
				usedProductEntity.getContent(),
				usedProductEntity.getPrice(),
				usedProductEntity.getStatus(),
				usedProductEntity.getViewCount(),
				usedProductEntity.getLikeCount(),
				usedProductEntity.getImages().stream()
						.map(UsedProductImage::getImageUrl).toList(),
				isLiked
		);
	}

}
