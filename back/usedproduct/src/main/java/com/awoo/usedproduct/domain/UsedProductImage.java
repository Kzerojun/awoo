package com.awoo.usedproduct.domain;

import jakarta.persistence.Access;
import jakarta.persistence.AccessType;
import jakarta.persistence.Embeddable;
import lombok.*;

@Embeddable
@Getter
@EqualsAndHashCode
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Access(AccessType.FIELD)
public class UsedProductImage {

    private String imageUrl;


    @Builder
    public UsedProductImage(String imageUrl) {
        this.imageUrl = imageUrl;
    }

}