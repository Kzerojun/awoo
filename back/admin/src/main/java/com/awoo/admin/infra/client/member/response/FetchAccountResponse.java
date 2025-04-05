package com.awoo.admin.infra.client.member.response;

import java.time.LocalDateTime;

public record FetchAccountResponse(int memberId,
                                   String bankCode,
                                   String accountNo,
                                   AccountType accountType,
                                   LocalDateTime accountCreatedAt,
                                   int petId,
                                   boolean isDelete
                                   ) {
    public enum AccountType {
        INTERNAL,
        SAVING
    }
}
