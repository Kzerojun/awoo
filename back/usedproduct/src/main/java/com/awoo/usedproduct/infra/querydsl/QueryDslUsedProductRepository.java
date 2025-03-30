package com.awoo.usedproduct.infra.querydsl;

import com.awoo.usedproduct.application.query.FetchMySalesQuery;
import com.awoo.usedproduct.domain.QUsedProductEntity;
import com.awoo.usedproduct.domain.UsedProductEntity;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class QueryDslUsedProductRepository {

    private final JPAQueryFactory queryFactory;
    @PersistenceContext
    private EntityManager entityManager;


    public List<UsedProductEntity> fetchMySales(FetchMySalesQuery query) {
        BooleanBuilder builder = new BooleanBuilder();
        QUsedProductEntity entity = QUsedProductEntity.usedProductEntity;

        // memberId 조건 추가
        if (query.memberId() != null) {
            builder.and(entity.memberId.eq(query.memberId()));
        }

        // status 조건 추가 (IN 절 사용)
        if (query.status() != null && !query.status().isEmpty()) {
            builder.and(entity.usedProductStatus.in(query.status()));
        }

        return queryFactory
                .selectFrom(entity)
                .where(builder)
                .orderBy(entity.createdAt.desc())
                .fetch();
    }
}
