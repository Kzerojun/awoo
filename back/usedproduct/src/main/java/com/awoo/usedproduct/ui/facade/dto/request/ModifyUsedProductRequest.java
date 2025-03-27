package com.awoo.usedproduct.ui.facade.dto.request;

import com.awoo.usedproduct.application.command.ModifyUsedProductCommand;
import com.awoo.usedproduct.ui.exception.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public record ModifyUsedProductRequest(String title, String content, Integer price) {


    public ModifyUsedProductCommand toCommand(String memberId, Integer productId, List<MultipartFile> images) {
        validate();
        return ModifyUsedProductCommand.builder()
                .title(title)
                .content(content)
                .price(price)
                .memberId(Integer.valueOf(memberId))
                .images(images)
                .usedProductId(productId)
                .build();
    }

    private void validate() {
        if (title == null || title.trim().isEmpty()) {
            throw new TitleRequiredException(UiErrorCode.TITLE_REQUIRED);
        }

        if (content == null || content.trim().isEmpty()) {
            throw new ContentRequiredException(UiErrorCode.CONTENT_REQUIRED);
        }

        if (price == null) {
            throw new PriceRequiredException(UiErrorCode.PRICE_REQUIRED);
        }
        if (price <= 0) {
            throw new PriceInvalidException(UiErrorCode.PRICE_INVALID);
        }
    }
}
