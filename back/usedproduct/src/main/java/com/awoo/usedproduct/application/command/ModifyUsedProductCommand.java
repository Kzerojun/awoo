package com.awoo.usedproduct.application.command;

import lombok.Builder;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public record ModifyUsedProductCommand(Integer memberId, String title, String content, Integer price,List<String> remainImages,
                                       List<MultipartFile> newImages, Integer usedProductId) {
    @Builder
    public ModifyUsedProductCommand{
    }
}
