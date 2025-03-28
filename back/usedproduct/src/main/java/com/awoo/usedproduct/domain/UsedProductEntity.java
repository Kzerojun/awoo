package com.awoo.usedproduct.domain;

import com.awoo.usedproduct.domain.exception.DomainExceptionErrorCode;
import com.awoo.usedproduct.domain.exception.UnauthorizedModificationException;
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

    public void modify(String title, String content,
                       Integer price, List<String> images){
        this.title = title;
        this.content = content;
        this.price = price;
        updateImages(images);
    }

    public boolean canModify(Integer memberId){
        System.out.println(this.memberId);
        System.out.println(memberId);

        if(!this.memberId.equals(memberId)){
            throw new UnauthorizedModificationException(DomainExceptionErrorCode.UNAUTHORIZED_MODIFICATION);
        }
        return true;
    }

    public void decreaseLikeCount(){
        this.likeCount--;
    }

    public void increaseLikeCount(){
        this.likeCount++;
    }


    private void updateImages(List<String> imageUrls){
        this.images = imageUrls.stream()
                .map(UsedProductImage::new)
                .toList();
    }
}
