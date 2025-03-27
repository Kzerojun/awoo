package com.awoo.account.domain;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "accounts")
@Getter
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class AccountEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer accountId;

    @Column(nullable = false)
    private Integer memberId;

    @Column(nullable = false, length = 3)
    private String bankCode;

    @Column(nullable = false, length = 128)
    private String accountNumber;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private boolean conditionsAgreement;

    @Builder
    public AccountEntity(String accountNumber, String bankCode, Integer memberId,
                         String password, boolean conditionsAgreement) {
        this.accountNumber = accountNumber;
        this.bankCode = bankCode;
        this.memberId = memberId;
        this.password = password;
        this.conditionsAgreement = conditionsAgreement;
    }

}
