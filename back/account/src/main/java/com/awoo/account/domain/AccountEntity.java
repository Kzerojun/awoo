package com.awoo.account.domain;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "accounts")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class AccountEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer accountId;

    @Column(nullable = false, length = 128)
    private String accountNumber;

    @Column(nullable = false, length = 3)
    private String bankCode;

    private Integer memberId;

    @Builder
    public AccountEntity(String accountNumber, String bankCode) {
        this.accountNumber = accountNumber;
        this.bankCode = bankCode;
    }

}
