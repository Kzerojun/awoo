package com.awoo.payment.domain;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Entity
@Getter
@Table(name = "payments")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class PaymentEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer paymentId;

    private BigDecimal balance;

    private String password;

    private Integer memberId;

    @Builder
    public PaymentEntity(String password, Integer memberId) {
        this.password = password;
        this.memberId = memberId;
    }
}
