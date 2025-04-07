package com.awoo.admin.ui.facade.dto.response;

import lombok.Builder;

import java.time.LocalDateTime;

public record CollectInternalInfoResponse(String memberName, String email, String nickname, LocalDateTime memberCreatedAt,
                                          String bankCode, String accountNo, AccountType accountType, LocalDateTime accountCreatedAt,
                                          boolean isDelete, String petName
                                          ) {
    public enum AccountType {
        INTERNAL,
        SAVING
    }

    @Builder
    public CollectInternalInfoResponse {

    }
}
