package com.awoo.admin.infra.client.account;

import java.time.LocalDateTime;

public record FetchAccountResponse(int memberId,
                                   String bankCode,
                                   String accountNo,
                                   AccountType accountType,
                                   LocalDateTime accountCreatedAt,
                                   Integer petId,
                                   boolean isDelete
                                   ) {
    public enum AccountType {
        INTERNAL,
        SAVING
    }
}
