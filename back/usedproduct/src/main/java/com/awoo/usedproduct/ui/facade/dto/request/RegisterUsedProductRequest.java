package com.awoo.usedproduct.ui.facade.dto.request;

import com.awoo.usedproduct.application.command.RegisterUsedProductCommand;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public record RegisterUsedProductRequest(String title, String content, Integer price) {


    public RegisterUsedProductCommand toCommand(String memberId, List<MultipartFile> images) {
        return RegisterUsedProductCommand.builder()
                .title(title)
                .content(content)
                .images(images)
                .memberId(Integer.valueOf(memberId))
                .price(price)
                .build();
    }
}
