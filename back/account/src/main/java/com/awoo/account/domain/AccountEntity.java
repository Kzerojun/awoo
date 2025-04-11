package com.awoo.account.domain;

import com.awoo.account.infra.BaseColumn.BaseEntity;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "accounts")
@Getter
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class AccountEntity extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer accountId;

    @Column(nullable = false)
    private Integer memberId;

    @Enumerated(EnumType.STRING)
    @Column(name = "account_type", nullable = false)
    private AccountType accountType;

    @Column(nullable = false, length = 3)
    private String bankCode;

    @Column(nullable = false, length = 128)
    private String accountNumber;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private boolean conditionsAgreement;

    @Column(name = "pet_id")
    private Integer petId;

    @Builder
    public AccountEntity(String accountNumber, String bankCode, Integer memberId,
                         String password, boolean conditionsAgreement, AccountType accountType, Integer petId) {
        this.accountNumber = accountNumber;
        this.bankCode = bankCode;
        this.memberId = memberId;
        this.password = password;
        this.conditionsAgreement = conditionsAgreement;
        this.accountType = accountType;
        this.petId = petId;
    }

}
