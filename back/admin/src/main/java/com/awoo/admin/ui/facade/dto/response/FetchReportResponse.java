package com.awoo.admin.ui.facade.dto.response;

import com.awoo.admin.domain.Process;
import com.awoo.admin.infra.Kafka.consume.RegisterReportConsume;

import java.time.LocalDateTime;

public record FetchReportResponse(
        Long reportId,
        String reporterName,
        String reporterEmail,
        String reportedUserName,
        String reportedUserEmail,
        int usedProductId,
        LocalDateTime reportedAt,
        RegisterReportConsume.Reason reason,
        Process process,
        int reportCount
) {}

