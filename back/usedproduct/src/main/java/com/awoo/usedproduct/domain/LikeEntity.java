package com.awoo.usedproduct.domain;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "likes")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class LikeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer likeId;

    private Integer memberId;
    private Integer usedProductId;

    @Builder
    public LikeEntity(Integer memberId, Integer usedProductId) {
        this.memberId = memberId;
        this.usedProductId = usedProductId;
    }


}
