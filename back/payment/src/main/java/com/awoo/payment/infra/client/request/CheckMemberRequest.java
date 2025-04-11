package com.awoo.payment.infra.client.request;

import lombok.Builder;

public record CheckMemberRequest(String phone, String name, Integer memberId) {

    @Builder
    public CheckMemberRequest {}
}
