package com.awoo.usedproduct.domain;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table(name = "used-products")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class UsedProductEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer usedProductId;

    private String title;

    private String content;

    private Integer price;

    @Enumerated(EnumType.STRING)
    private Status status;

    private int viewCount;

    private int likeCount;

    @ElementCollection
    @CollectionTable(
            name = "used_product_images",
            joinColumns = @JoinColumn(name = "used_product_id")
    )
    private List<UsedProductImage> images;

    private Integer memberId;

    @Builder
    public UsedProductEntity(String title, String content, Integer price,List<UsedProductImage> images, Integer memberId) {
        this.title = title;
        this.content = content;
        this.price = price;
        this.memberId = memberId;
        this.status = Status.SA;
        this.viewCount = 0;
        this.likeCount = 0;
        this.images = images;
    }
}
