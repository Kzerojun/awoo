package com.awoo.member.ui.dto;

public record FindMemberKeyResponse(String memberKey) {
    public static FindMemberKeyResponse create(String memberKey) {
        return new FindMemberKeyResponse(memberKey);
    }
}
