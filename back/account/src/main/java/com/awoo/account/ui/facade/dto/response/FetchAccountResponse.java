package com.awoo.account.ui.facade.dto.response;

import com.awoo.account.domain.AccountType;
import lombok.Builder;

import java.time.LocalDateTime;

public record FetchAccountResponse(int memberId,
                                   String bankCode,
                                   String accountNo,
                                   AccountType accountType,
                                   LocalDateTime accountCreatedAt,
                                   Integer petId,
                                   boolean isDelete) {
    @Builder
    public FetchAccountResponse {

    }
}
