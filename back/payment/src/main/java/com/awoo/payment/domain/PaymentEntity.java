package com.awoo.payment.domain;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Table(name = "payments")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class PaymentEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer paymentId;

    @Column(nullable = false)
    private int balance;

    private String password;

    @Column(nullable = false)
    private Integer memberId;

    private String accountNo;

    @Builder
    public PaymentEntity(String password, Integer memberId) {
        this.password = password;
        this.memberId = memberId;
        this.balance = 0;
    }

    public void registerPassword(String password) {
        this.password = password;
    }

    public void chargeBalance(int amount) {
        this.balance += amount;
    }
}
