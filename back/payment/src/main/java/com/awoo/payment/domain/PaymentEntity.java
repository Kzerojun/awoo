package com.awoo.payment.domain;

import com.awoo.payment.domain.event.BalanceChargedCancelEvent;
import com.awoo.payment.domain.event.BalanceChargeProcessedEvent;
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

    @Builder
    public PaymentEntity(String password, Integer memberId) {
        this.password = password;
        this.memberId = memberId;
        this.balance = 0;
    }

    public void registerPassword(String password) {
        this.password = password;
    }

    public BalanceChargeProcessedEvent chargeBalance(Integer memberId,int amount) {
        this.balance += amount;
        return BalanceChargeProcessedEvent.builder()
                .memberId(memberId)
                .chargeAmount(amount)
                .build();
    }

    public BalanceChargedCancelEvent cancelCharge(int amount) {
        this.balance -= amount;
        return new BalanceChargedCancelEvent("잔액 충전에 실패하셨습니다.");
    }

}
