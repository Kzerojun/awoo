package com.awoo.payment.domain;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;

import java.math.BigDecimal;

@Entity
@Getter
@Table(name = "payments")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class PaymentEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer paymentId;

    @Column(nullable = false)
    private Integer balance;

    private String password;

    @Column(nullable = false)
    private Integer memberId;

    @Builder
    public PaymentEntity(String password, Integer memberId) {
        this.password = password;
        this.memberId = memberId;
        this.balance = BigDecimal.ZERO;
    }

    public void registerPassword(String password) {
        this.password = password;
    }

    public void chargeBalance(Integer amount) {
        this.balance += amount;
    }

}
