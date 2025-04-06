package com.awoo.admin.infra.Kafka.consume;

import com.awoo.admin.application.command.RegisterReportCommand;

import java.time.LocalDateTime;

public record RegisterReportConsume(
        User reporter,
        User reportedUser,
        int usedProductId,
        LocalDateTime reportedAt,
        Reason reason,
        String reportDetails
) {
    public record User(
            String name,
            String email
    ) {}

    public enum Reason {
        ABUSE("욕설/비하"),
        FRAUD("사기"),
        SPAM("스팸/광고"),
        FALSE_INFORMATION("허위 정보"),
        HATE_SPEECH("혐오 발언"),
        SEXUAL_CONTENT("성적 콘텐츠"),
        OTHER("기타");

        private final String description;

        Reason(String description) {
            this.description = description;
        }

        public String getDescription() {
            return description;
        }
    }

    public RegisterReportCommand toCommand() {
        return RegisterReportCommand.builder()
                .reporterName(reporter.name)
                .reporterEmail(reporter.email)
                .reportedUserName(reportedUser.name)
                .reportedUserEmail(reportedUser.email)
                .usedProductId(usedProductId)
                .reportedAt(reportedAt)
                .reason(reason)
                .build();
    }
}


