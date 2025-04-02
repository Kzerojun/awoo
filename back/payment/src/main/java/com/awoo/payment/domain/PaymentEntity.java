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

    public int calSafeFee(int amount) {
        int fee = (int) Math.ceil(amount * 0.015);
        return amount-fee;
    }

    public void registerAccount(String accountNo) {
        this.accountNo = accountNo;
    }

    public boolean verifyPassword(String password) {
		return this.password.equals(password);
	}

    public void transfer(Integer amount) {
        if (this.balance < amount) {
            throw new IllegalArgumentException("잔액이 충분하지 않습니다.");
        }

        this.balance -= amount;
    }
}
