package com.awoo.admin.domain.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Getter
@Table(name = "accounts")
@AllArgsConstructor
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class AccountEntity {

    @Id
    private Long accountId;

    @Column(name = "name", nullable = false)
    private String userName;

    @Column(name = "email")
    private String Email;

    @Column(name = "nickname", nullable = false)
    private String userNickname;

    @Column(name = "create_at", nullable = false)
    private LocalDateTime createdAt;

    @Column(name = "account_no", nullable = false)
    private String accountNo;

    @Column(name = "pet_name")
    private String petName;


}
