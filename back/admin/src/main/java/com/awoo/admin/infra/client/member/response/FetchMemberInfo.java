package com.awoo.admin.infra.client.member.response;

import java.time.LocalDateTime;

public record FetchMemberInfo(int memberId,
                              String name,
                              String email,
                              String nickname,
                              LocalDateTime memberCreatedAt) {
}
