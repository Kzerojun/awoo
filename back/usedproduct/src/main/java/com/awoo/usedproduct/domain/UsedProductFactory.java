package com.awoo.usedproduct.domain;

import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class UsedProductFactory {

    public UsedProductEntity create(Integer memberId, String title, String content,Integer price, List<String> images){
        return UsedProductEntity.builder()
                .title(title)
                .content(content)
                .price(price)
                .memberId(memberId)
                .images(images.stream()
                        .map(image -> UsedProductImage.builder().imageUrl(image).build())
                        .toList())
                .build();
    }
}
