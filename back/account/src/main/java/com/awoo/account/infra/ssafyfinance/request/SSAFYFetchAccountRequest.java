package com.awoo.account.infra.ssafyfinance.request;

import lombok.Builder;

public record SSAFYFetchAccountRequest(String accountNo) {

    @Builder
    public SSAFYFetchAccountRequest {

    }
}
