package com.awoo.member.ui.dto;

import java.time.LocalDateTime;

public record FetchMemberInfo(int memberId,
                              String name,
                              String email,
                              String nickname,
                              LocalDateTime memberCreatedAt) {
}
