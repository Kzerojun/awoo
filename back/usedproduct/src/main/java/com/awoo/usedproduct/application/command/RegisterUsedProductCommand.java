package com.awoo.usedproduct.application.command;

import lombok.Builder;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public record RegisterUsedProductCommand(Integer memberId, String title, String content, Integer price,
                                         List<MultipartFile> images) {

    @Builder
    public RegisterUsedProductCommand {

    }
}
