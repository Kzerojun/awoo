package com.awoo.admin.application.command;

import com.awoo.admin.infra.Kafka.consume.RegisterReportConsume.Reason;
import lombok.Builder;

import java.time.LocalDateTime;

public record RegisterReportCommand(String reporterName,
                                    String reporterEmail,
                                    String reportedUserName,
                                    String reportedUserEmail,
                                    int usedProductId,
                                    LocalDateTime reportedAt,
                                    Reason reason) {

    @Builder
    public RegisterReportCommand {

    }
}
